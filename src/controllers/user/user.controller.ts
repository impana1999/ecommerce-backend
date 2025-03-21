import { Request, Response } from 'express';
import { UserService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';

export default class UserController {
  private userService = new UserService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */
  public getprofile = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const data = await this.userService.getProfile(userId);
    ApiResponse.successResponseWithData(res, "Profile Fetched Successfully!", data);
  });
  
  public updateprofile = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const data = await this.userService.updateProfile(userId,req.body);
    ApiResponse.successResponseWithData(res, "Profile Fetched Successfully!", data);
  });
  
}
