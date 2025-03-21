// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { UserModel, TokenModel } from '@models/index';
const useTwilioCountry = ['1'];
import bcrypt, { hash } from 'bcryptjs';

export default class AdminUserService {
  private userModel = UserModel;
  private tokenModel = TokenModel;
  saltRounds: number;

  // Get all users details
  public async getAllUsers() {
    try {
      const users = await this.userModel.find().select('-password');
      return users;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  // get single user details 
  public async getUserById(userId: string) {
    try {
      const user = await this.userModel.findById(userId).select('-password');

      if (!user) {
        throw new HttpException(404, 'User not found');
      }
      return user;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // update single user details
  public async updateUserById(userId: string, updatedUserData: any) {
    try {
      const user = await this.userModel.findById(userId);
      console.log('User', user);
      if (!user) {
        throw new HttpException(400, 'User not found');
      } else {
        if (updatedUserData.password) {
          const salt = bcrypt.genSaltSync(this.saltRounds);
          user.password = bcrypt.hashSync(updatedUserData.password, salt);
        }
        const updateUser = {...user["_doc"], ...updatedUserData};
        return updateUser;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async removeUserById(userId: string) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new HttpException(404, 'User not found');
      }
      await this.userModel.findByIdAndRemove( userId );
      const response = {
        message: 'User data removed successfully from database'
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


}
