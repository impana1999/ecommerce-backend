import { Request, Response } from 'express';
import { AdminAuthService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';


export default class AdminAuthController {
  private adminAuthService = new AdminAuthService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */
  public adminregister = catchAsync(async( req: Request, res : Response) : Promise<void> => {
    const registerData = await this.adminAuthService.adminRegister(req.body)
    ApiResponse.successResponseWithData(res, "Registration Sucess", registerData)
  })

  public adminlogin = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const loginData = await this.adminAuthService.adminlogin(req.body);
    ApiResponse.successResponseWithData(res, 'Login Success', loginData);
  });

  public adminlogout = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const { adminId } = req.body;
      await this.adminAuthService.adminLogout(adminId);
      ApiResponse.successResponse(res, 'Logged Out Successfully');
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });
  
  public adminMobileLogin = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const mobloginData = await this.adminAuthService.mobileLogin(req.body);
    ApiResponse.successResponse(res, 'Otp Sent Successfully');
  });

  public verifyotp = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const loginData = await this.adminAuthService.verifyOtp(req.body);
    ApiResponse.successResponseWithData(res, 'Login Success',loginData);

  });


  public forgotpassowrd = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const loginData = await this.adminAuthService.forgotPassword(email);
    ApiResponse.successResponseWithData(res, 'Email OTP sent successfully',loginData);
  });
  public verifyEmailOtp = catchAsync(async (req: Request, res: Response): Promise<void> => {

    const { email, emailOtp } = req.body;
    const loginData = await this.adminAuthService.verifyEmailOtp(email, emailOtp);
    ApiResponse.successResponseWithData(res, 'Email OTP verified successfully',loginData);

  });
  public resetpassowrd = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await this.adminAuthService.resetPassword(req.user.id, req.body);
    ApiResponse.successResponse(res, 'Password reset successfully');
  });

  
  public usercount = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data= await this.adminAuthService.userCount();
    ApiResponse.successResponseWithData(res, 'Count Fetched successfully',data);
  });
}
