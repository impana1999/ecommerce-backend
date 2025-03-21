// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { sendSMSWithSNS } from '@/lib/aws-sns-sms';
import { sendSMSWithTwilio } from '@/lib/twilio';
import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from '@globals/jwt.global';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import { UserModel, TokenModel } from '@models/index';
import { TokenService } from '@services/index'
import { generateOtp } from '@/helpers/otp.helper';
import { TokenPayload, UserStatus } from '@/interfaces';
import { generateTokensObject, generateUserTokenPayload } from '@/helpers/token.helper';
const useTwilioCountry = ['1'];
import Razorpay from 'razorpay'

export default class AuthService {
  private userModel = UserModel;
  private tokenModel = TokenModel;
  private saltRounds = 10;
  private tokenService = new TokenService();

  public async userRegister(userInput) {
    try {
      const existingUser = await this.userModel.findOne({ email: userInput.email });

      if (existingUser) {
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }

      const salt = bcrypt.genSaltSync(this.saltRounds);
      const encryptedPassword = bcrypt.hashSync(userInput.password, salt);
      let razorpayCustomer;

      const razorpayInstanceLocal = new Razorpay({
        key_id: 'rzp_test_1d8Uz0Rqn101Hj',
        key_secret: 'DREkz3zAKcStej7cslGOdYLy'
      });
      const newCustomer = await razorpayInstanceLocal.customers.create(userInput.MobileNumber);
      razorpayCustomer = newCustomer.id;
      console.log("newcustomer", newCustomer);
      userInput.password = encryptedPassword;
      userInput.status = UserStatus.ACTIVE;
      userInput.customerId = razorpayCustomer;

      const newUser = await (await this.userModel.create(userInput)).save();

      const tokenPayload = generateUserTokenPayload(newUser);
      const tokens = generateTokensObject(tokenPayload);
      (await this.tokenModel.create({userId: newUser._id, ...tokenPayload})).save();

      const response = { user: tokenPayload, tokens,customerId:razorpayCustomer }

      return response;
    } catch (err) {
      if (err.code === 11000 || err.code === 11001){
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // public async userlogin(userInput: {
  //   email: string;
  //   password: string;
  //   mobileNumber: string;
  // }) {
  //   try {
      
  //     let user, passwordMatch;
  //     user = await this.userModel.find({
  //       email: userInput.email
  //     });
  //     user = user[0];
  //     if (!user) {
  //       throw new HttpException(400, 'User does not exist!');
  //     } else {
  //       passwordMatch = bcrypt.compareSync(userInput.password, user.password);
  //     }


  //     if(!passwordMatch) throw new HttpException(400, 'Password does not match');
      
  //     let userPayload = generateUserTokenPayload(user);
  //     // Generate Tokens
  //     const tokens = generateTokensObject(userPayload);
  //     // Update user collection
  //     await this.userModel.findByIdAndUpdate(user._id, { $set: { isLoggedIn: true } });
  //     user=await this.userModel.findOne({_id:user._id});
  //     // Store Tokens in Tokens collection
  //     await this.tokenService.storeUserTokens(user._id, tokens)

  //     const response = {user:userPayload, tokens, customerId:user.customerId };
  //     return response;
  //   }
  //   catch (err) {
  //     if (err.message.includes('E11000')) {
  //       throw new HttpException(400, 'Email already exists!');
  //     }
  //     throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  //   }
  // }

  
  // When the user Logged Out
  
  public async userlogin(userInput: {
    email: string;
    password: string;
    mobileNumber: string;
  }) {
    try {
      let user, passwordMatch;
      user = await this.userModel.findOne({ email: userInput.email });
  
      if (!user) {
        throw new HttpException(400, 'User does not exist!');
      } else {
        passwordMatch = bcrypt.compareSync(userInput.password, user.password);
      }
  
      if (!passwordMatch) {
        throw new HttpException(400, 'Password does not match');
      }
  
      let userPayload = generateUserTokenPayload(user);
      const tokens = generateTokensObject(userPayload);
  
      // Update user collection to set isLoggedIn to true
      await this.userModel.findByIdAndUpdate(user._id, { $set: { isLoggedIn: true } });
  
      // Retrieve the updated user details
      const users = await this.userModel.findOne({email:userInput.email});
  
      // Store Tokens in Tokens collection
      await this.tokenService.storeUserTokens(user._id, tokens);
  
      // Assuming 'customerId' is a property in the user object
      const response = { user: userPayload, tokens, customerId: users.customerId };
      console.log(users)
      return response;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(400, 'Email already exists!');
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  public async userLogout(userId: string) {
    try {
      const userToken = await this.tokenModel.findOne({ userId });
      if (!userToken) {
        throw new HttpException(400, 'User does not exist');
      } else {

        await this.userModel.findByIdAndUpdate(userId,
          {
            $set:
              { isLoggedIn: false }
          }, { new: true });
        await this.tokenModel.deleteOne({ userId });
        return;
      }
    } catch (err) {
      console.log('Error ', err);
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // user login throgh mobile number

  public async mobileLogin(userInput: { mobileNumber: string; }) {
    try {
      let user;
      const { mobileNumber } = userInput;

      user = await this.userModel.findOne({ mobileNumber: userInput.mobileNumber });

      const otp = process.env.NODE_ENV === 'development' ? 1234 : generateOtp();
      if (!user) {
        throw new HttpException(400, 'Mobile number does not exists');
      }
      // await sendSMSWithSNS(mobileNumber, `Your OTP is ${otp}`, 'Otp was successfully send');
      if (!otp) {
        throw new HttpException(400, 'Invalid Login Credentials');
      }
      const userId = user._id;

      user = await await this.userModel.findOneAndUpdate(userId, { $set: { otp } }, { new: true });

      return;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(400, 'Email or MobileNumber already exists!'); 
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Verify Otp
  public async verifyOtp(userInput: { mobileNumber: string; otp: number }) {
    try {
      const { mobileNumber, otp } = userInput;

      const user = await this.userModel.findOne({ mobileNumber });

      if (!user) {
        throw new HttpException(400, 'Invalid Mobile Number');
      }

      if (user.otp !== otp) {
        throw new HttpException(400, 'Invalid OTP');
      }


      user.status = UserStatus.ACTIVE;
      user.otp = undefined;
      const userId = user._id;

      const userPayload = generateUserTokenPayload(user);
      const tokens = generateTokensObject(userPayload);


      await user.save();

      const userToken = await this.tokenModel.updateOne(
        {
          userId: user._id,
        },
        tokens,
        { upsert: true }
      );

      const response = { user: userPayload, tokens };

      return response;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async forgotPassword(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new HttpException(400, 'Invalid email');
      }

      let emailOtp = process.env.NODE_ENV === 'development' ? 1234 : generateOtp();
      // Send OTP via email : code goes here
      await this.userModel.findByIdAndUpdate(user._id,
        { $set: { emailOtp } },
      );

      if (process.env.NODE_ENV === 'development') { return { emailOtp }}
      else return { emailOtp }

    }
    catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  public async verifyEmailOtp(email: string, emailOtp: number ) {

    try {

      const user = await this.userModel.findOne({email});
      console.log('user', user);
      if (!user) {
        throw new HttpException(400, 'Invalid email');
      }
      if (user.emailOtp !== emailOtp ) {
        throw new HttpException(400, 'Invalid OTP');
      }
      // user.status = true;
      user.emailOtp = undefined;
      await user.save();

      const tempToken = generateAccessToken({ id: user._id, email, type: 'USER' });
      // await this.tokenModel.findByIdAndUpdate(
      //   user._id,
      //   {
      //     $set: {
      //       tempToken: 
      //     }
      //   }
      // )
      const response = { tempToken };

      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // user reset the password 
  public async resetPassword( userId: string, userInput: {email: string, password: string} ) {
    try {

      let user, newPassword;
      newPassword = userInput.password;

      user = await this.userModel.findOne({ _id: userId });

      if (!user) {
        throw new HttpException(400, 'Invalid user id');
      }
      const salt = bcrypt.genSaltSync(this.saltRounds);
      const encryptPassword = bcrypt.hashSync(newPassword, salt);

      const userPayload = generateUserTokenPayload(user);
      const tokens = generateAccessToken(userPayload);
 
      await this.userModel.findByIdAndUpdate(userId, { $set : { password: encryptPassword } })
      await this.tokenModel.findOneAndUpdate({ userId }, { $set: { tokens } }, { new: true });

      const response = {
        user: userPayload,
        tokens,
      }
      return response
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  public async newPassword(mobileNumber: string,userId:string) {
    try {
      const user = await this.userModel.findOne({ mobileNumber,_id:userId });
      if (!user) {
        throw new HttpException(400, 'Invalid mobileNumber Or Not a valid User');
      }

      let mobileNumberOtp = process.env.NODE_ENV === 'development' ? 1234 : generateOtp();
      // Send OTP via email : code goes here
      await this.userModel.findByIdAndUpdate(user._id,
        { $set: { mobileNumberOtp } },
      );

      if (process.env.NODE_ENV === 'development') { return { mobileNumberOtp }}
      else return { mobileNumberOtp }

    }
    catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async verifyPasswordOtp(mobileNumber: string, mobileNumberOtp: number ) {

    try {

      const user = await this.userModel.findOne({mobileNumber});
      console.log('user', user);
      if (!user) {
        throw new HttpException(400, 'Invalid email');
      }
      if (user.mobileNumberOtp !== mobileNumberOtp ) {
        throw new HttpException(400, 'Invalid OTP');
      }
      // user.status = true;
      user.mobileNumberOtp = undefined;
      await user.save();

      const tempToken = generateAccessToken({ id: user._id, mobileNumber, type: 'USER' });
      const response = { tempToken };

      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  
  public async changePassword( userId: string, userInput: {mobileNumber: string, password: string,oldPassword: string} ) {
    try {

      let user, newPassword;
      newPassword = userInput.password;

      user = await this.userModel.findOne({ _id: userId });

      if (!user) {
        throw new HttpException(400, 'Invalid user id');
      }
      const oldPasswordMatches = bcrypt.compareSync(userInput.oldPassword, user.password);

      if (!oldPasswordMatches) {
        throw new HttpException(400, 'Old password does not match');
      }
  
      const salt = bcrypt.genSaltSync(this.saltRounds);
      const encryptPassword = bcrypt.hashSync(newPassword, salt);

      const userPayload = generateUserTokenPayload(user);
      const tokens = generateAccessToken(userPayload);
 
      await this.userModel.findByIdAndUpdate(userId, { $set : { password: encryptPassword } })
      await this.tokenModel.findOneAndUpdate({ userId }, { $set: { tokens } }, { new: true });

      const response = {
        user: userPayload,
        tokens,
      }
      return response
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


}
