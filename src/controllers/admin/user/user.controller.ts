import { Request, Response } from 'express';
import { AdminUserService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class AdminUserController {
  private adminUserService = new AdminUserService();

  public getallusers = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.adminUserService.getAllUsers();

      ApiResponse.successResponseWithData(res, 'Successfully Getting All Users Details', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public getuserbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;

      const data = await this.adminUserService.getUserById(userId);

      ApiResponse.successResponseWithData(res, 'Successfully Get User', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public updateuserbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      // const { password, firstName, lastName } = req.body;
      const data = await this.adminUserService.updateUserById(userId, req.body);

      ApiResponse.successResponseWithData(res, 'Successfully updated user', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public removeuserbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;

      await this.adminUserService.removeUserById(userId);

      ApiResponse.successResponse(res, 'Successfully  Remove User');
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });
}
