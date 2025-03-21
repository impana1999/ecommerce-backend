import { Request, Response } from 'express';
import { AuthService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class AuthController {
  private adminAuth = new AuthService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */
  public userRegister = catchAsync(async( req: Request, res : Response) : Promise<void> => {
    const registerData = await this.adminAuth.userRegister(req.body)
    ApiResponse.successResponseWithData(res, "Registration Sucess", registerData)
  })
  
  public login = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const loginData = await this.adminAuth.userlogin(req.body);
    ApiResponse.successResponseWithData(res, 'Login Success', loginData);
  });

  public logout = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {

      const userId  = req.user.id;
      await this.adminAuth.userLogout(userId);
      ApiResponse.successFullyLoggedOut(res, 'Logged Out Successfully');
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public mobileLogin = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const loginData = await this.adminAuth.mobileLogin(req.body);
    ApiResponse.successResponse(res, 'Otp Sent Successfully');
  });
    
  public verifyotp = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const loginData = await this.adminAuth.verifyOtp(req.body);
    ApiResponse.successResponseWithData(res, 'Login Success',loginData);
  });

  public forgotpassowrd = catchAsync(async (req: Request, res: Response): Promise<void> => {

    const { email } = req.body;
    const loginData = await this.adminAuth.forgotPassword(email);
    ApiResponse.successResponseWithData(res, 'Email OTP sent successfully',loginData);
  });

  public verifyEmailOtp = catchAsync(async (req: Request, res: Response): Promise<void> => {

    const { email, emailOtp } = req.body;
    const loginData = await this.adminAuth.verifyEmailOtp(email, emailOtp);
    ApiResponse.successResponseWithData(res, 'Email OTP verified successfully',loginData);

  });

  public resetpassowrd = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await this.adminAuth.resetPassword(req.user.id, req.body);
    ApiResponse.successResponse(res, 'Password reset successfully');
  });

  public newpassword = catchAsync(async (req: Request, res: Response): Promise<void> => {

    const { mobileNumber ,userId} = req.body;
    const loginData = await this.adminAuth.newPassword(mobileNumber,userId);
    ApiResponse.successResponseWithData(res, 'Mobilenumber OTP sent successfully',loginData);
  });

  public verifypasswordotp = catchAsync(async (req: Request, res: Response): Promise<void> => {

    const { mobileNumber, mobileNumberOtp } = req.body;
    const loginData = await this.adminAuth.verifyPasswordOtp(mobileNumber, mobileNumberOtp);
    ApiResponse.successResponseWithData(res, 'mobileNumber OTP verified successfully',loginData);

  });
 
  public changepassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await this.adminAuth.changePassword(req.user.id, req.body);
    ApiResponse.successResponse(res, 'Password reset successfully');
  });
}
