// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { sendSMSWithSNS } from '@/lib/aws-sns-sms';
import { sendSMSWithTwilio } from '@/lib/twilio';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  getAccessTokenExpiry, 
  getRefreshTokenExpiry } from '@globals/jwt.global'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { UserModel } from '@models/index';
import { TokenService } from '@services/index';

const useTwilioCountry = ['1'];


export default class UserService {
  private userModel = UserModel;
  /**
   * User SignIn or Register
   */

  public async getProfile(userId: string) {
    try {
      // console.log(`No bookings found for user with ID: ${userId}`);
      const response = await this.userModel.findOne({_id: userId});
      if (!response) {
        console.log(`No User Found: ${userId}`);
        throw new HttpException(404, 'No user found');
      }
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  public async updateProfile(userId: string, updateData: any) {
    try {
      const data = await this.userModel.findOne({_id: userId});
      if (!data) {
        console.log(`No User Found`);
        throw new HttpException(404, 'No user found');
      }else{
        if (updateData.firstName) {
          data.firstName = updateData.firstName;
        }
        if (updateData.lastName) {
          data.lastName = updateData.lastName;
        } 
        if (updateData.nationality) {
          data.nationality = updateData.nationality;
        }
        if (updateData.status) {
          data.status = updateData.status;
        }
        if (updateData.gender) {
          data.gender = updateData.gender;
        }
        if (updateData.dateOfBirth) {
          data.dateOfBirth = updateData.dateOfBirth;
        }
        if (updateData.proBowler) {
          data.proBowler = updateData.proBowler;
        }
        if (updateData.profilePicture) {
          data.profilePicture = updateData.profilePicture;
        }
        const updatedPackage = await data.save();
        return updatedPackage;
      }
      
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
