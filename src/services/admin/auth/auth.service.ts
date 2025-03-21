import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { sendSMSWithSNS } from '@/lib/aws-sns-sms';
import { sendSMSWithTwilio } from '@/lib/twilio';
import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from '@globals/jwt.global';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import { AdminModel } from '@models/Admin/Admin.Schema';
import { AdminTokenSchemaModel } from '@models/Admin/AdminToken.Schema';
const useTwilioCountry = ['1'];
import { generateOtp } from '@/helpers/otp.helper';
import { TokenPayload, AdminStatus, Roles } from '@/interfaces';
import { generateAdminTokenPayload, generateAdminTokensObject } from '@/helpers/token.helper';
import AdminTokenService from '@/services/admin/auth/adminToken.service';
import { UserModel, TokenModel } from '@models/index';
import * as sendmail from '@/middlewares/email.services';


export default class AdminAuthService {


  private adminModel = AdminModel;
  private adminTokenSchemaModel = AdminTokenSchemaModel;
  private userModel = UserModel;
  private saltRounds = 10;
  private adminTokenService = new AdminTokenService();
  adminTokenModel: any;

  
  // Registration for admin
  public async adminRegister(adminInput: {
    email: string;
    password: string;
    mobileNumber: string;
    countryCode: string;
    firstName: string;
    lastName: string;
  }) {
    try {
      const { email, password, countryCode, mobileNumber, firstName, lastName } = adminInput;

      const existingAdmin = await this.adminModel.findOne({ email });

      if (existingAdmin) {
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }

      const salt = bcrypt.genSaltSync(this.saltRounds);
      const encryptedPassword = bcrypt.hashSync(password, salt);

      adminInput['role'] = Roles.ADMIN;
      const newAdmin = await (
        await this.adminModel.create({
          ...adminInput,
          password: encryptedPassword,
        })
      ).save();
      // console.log(encryptedPassword)

      const admin = generateAdminTokenPayload(newAdmin);

      const generatedToken = generateAccessToken(admin);
      const refreshToken = generateRefreshToken(admin);

      const response = {
        admin,
        tokens: {
          accessToken: generatedToken,
          refreshToken,
        },
      };

      return response;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  //admin login with email and password
  public async adminlogin(adminInput: { email: string; password: string }) {
    try {
      let admin, passwordMatch;

      admin = await this.adminModel.find({
        email: adminInput.email,
      });
      admin = admin[0];

      if (!admin) {
        throw new HttpException(400, 'Invalid email');
      } else {
        // console.log('User-provided password:', adminInput.password);
        // console.log('Stored hashed password:', admin.password);
        passwordMatch = bcrypt.compareSync(adminInput.password, admin.password);
      }
      // console.log('Password match result:', passwordMatch);
      if (!passwordMatch) throw new HttpException(400, 'Password does not match');

      let adminPayload = generateAdminTokenPayload(admin);
      // Generate Tokens
      const tokens = generateAdminTokensObject(adminPayload);
      const adminId = admin._id;

      await this.adminTokenService.storeAdminTokens(admin._id, tokens);

      await this.adminModel.updateOne({ _id: adminId }, { $set: { isLoggedIn: true } }, { upsert: true });

      const response = {
        admin: adminPayload,
        tokens,
      };

      return response;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // When the admin Logegd Out
  public async adminLogout(adminId: string) {
    try {
      const adminToken = await this.adminTokenSchemaModel.findOne({ adminId });
      if (!adminToken) {
        throw new HttpException(400, 'Invalid adminId');
      } else {
        await this.adminModel.findByIdAndUpdate(
          adminId,
          { $set: { isLoggedIn: false } },
          { new: true }
        );
        await this.adminTokenSchemaModel.deleteOne({ adminId });
        return;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // admin forget the password then update the password
  public async forgotPassword(email: string) {
    try {
      let admin = await this.adminModel.findOne({
        email,
      });

      if (!admin) {
        throw new HttpException(400, 'Invalid email');
      }
      let emailOtp = process.env.NODE_ENV === 'development' ? 1234 : generateOtp();
      const resetToken = await (await this.adminModel.findByIdAndUpdate(admin._id, { $set: { emailOtp } }, { new: true })).save();
      
      await sendmail.sendmail(email,emailOtp);
      if (process.env.NODE_ENV === 'development') {
        return { emailOtp };
      } else return { emailOtp };
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // admin login throgh mobile number
  public async mobileLogin(adminInput: { countryCode: string, mobileNumber: string }) {
    try {
      let admin;
      const { mobileNumber } = adminInput;

      admin = await this.adminModel.findOne({
        countryCode: adminInput.countryCode,
        mobileNumber: adminInput.mobileNumber
      });

      const otp = process.env.NODE_ENV === 'development' ? 1234 : generateOtp();
      if (!admin) {
        throw new HttpException(400, 'Invalid Mobile Number');
      }
      if (!otp) {
        throw new HttpException(400, 'Invalid Login Credentials');
      }
      const adminId = admin._id;

      admin = await await this.adminModel.findOneAndUpdate(adminId, { $set: { otp } }, { new: true });

      return;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // Verify Otp
  public async verifyOtp(adminInput: { mobileNumber: string; otp: number }) {
    try {
      const { mobileNumber, otp } = adminInput;

      const admin = await this.adminModel.findOne({ mobileNumber });

      if (!admin) {
        throw new HttpException(400, 'Invalid Mobile Number');
      }

      if (admin.otp !== otp) {
        throw new HttpException(400, 'Invalid OTP');
      }

      admin.status = AdminStatus.ACTIVE;
      admin.otp = undefined;
      const adminId = admin._id;
      await this.adminModel.findOneAndUpdate(adminId, { $set: { isLoggedIn: true } }, { new: true });

      await admin.save();

      const adminToken = await this.adminTokenSchemaModel.updateOne(
        {
          adminId: admin._id,
        },
        { upsert: true },
      );

      const response = { admin: adminToken };
      console.log(adminToken);
      return response;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(400, 'Email or MobileNumber already exists!');
      }
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  public async verifyEmailOtp(email: string, emailOtp: number) {
    try {
      const admin = await this.adminModel.findOne({ email });
      if (!admin) {
        throw new HttpException(400, 'Invalid email');
      }
      if (admin.emailOtp !== emailOtp) {
        throw new HttpException(400, 'Invalid OTP');
      }

      admin.emailOtp = undefined;
      await admin.save();

      const tempToken = generateAccessToken({ id: admin._id, email, type: 'ADMIN' });

      const response = { tempToken };

      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  public async resetPassword(adminId: string, adminInput: { email: string; password: string }) {
    try {
      let admin, newPassword;
      newPassword = adminInput.password;

      admin = await this.adminModel.findOne({ _id: adminId });

      if (!admin) {
        throw new HttpException(400, 'Invalid admin id');
      }
      // const adminId = admin._id;
      const salt = bcrypt.genSaltSync(this.saltRounds);
      const encryptPassword = bcrypt.hashSync(newPassword, salt);

      const adminPayload = generateAdminTokenPayload(admin);
      const tokens = generateAccessToken(adminPayload);


      await this.adminModel.findByIdAndUpdate(adminId, { $set: { password: encryptPassword } })
      await this.adminTokenSchemaModel.findOneAndUpdate({ adminId }, { $set: { tokens } }, { new: true });

      const response = {
        admin: adminPayload,
        tokens,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  
  // get all banner details
  public async userCount() {
    try {
      const count = await this.userModel.find().countDocuments(); // Use countDocuments()
    return { count };
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
