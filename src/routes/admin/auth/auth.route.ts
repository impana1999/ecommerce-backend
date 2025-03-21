import { Router } from 'express';
import { AdminAuthController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { AdminLoginDto, AdminMobileLoginDto, AdminSignUpDto, ForgotAuthPasswordDto, AdminOtpDto, AdminResetPasswordDto } from '@dtos/admin/';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AdminAuthRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public adminAuthController = new AdminAuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/sign-up', validationMiddleware(AdminSignUpDto, 'body'), this.adminAuthController.adminregister)
    this.router.post(this.path + '/login', validationMiddleware(AdminLoginDto, 'body'), this.adminAuthController.adminlogin);
    this.router.get(this.path + '/logout',
    // authMiddleware, 
    this.adminAuthController.adminlogout);
    this.router.post(this.path + '/mobile-login', validationMiddleware(AdminMobileLoginDto, 'body'), this.adminAuthController.adminMobileLogin);

    this.router.post(this.path + '/verify-otp', validationMiddleware(AdminOtpDto, 'body'), this.adminAuthController.verifyotp);
    this.router.post(this.path + '/forgot-password', validationMiddleware(ForgotAuthPasswordDto, 'body'), this.adminAuthController.forgotpassowrd);
    this.router.post(
      this.path + '/verify-email-otp',
      // authMiddleware,
      this.adminAuthController.verifyEmailOtp,
    );

    this.router.post(
      this.path + '/reset-password',
      validationMiddleware(AdminResetPasswordDto, 'body'),
      authTempMiddleware,
      this.adminAuthController.resetpassowrd,
    );
    this.router.get(
      this.path + '/user-count',
      authTempMiddleware,
      this.adminAuthController.usercount,
    );

  }
}

export default AdminAuthRoute;
