import { Router } from 'express';
import { AuthController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { LoginDto, MobileLoginDto,SignUpDto,OtpDto,ForgotPasswordDto,ChangePasswordwithNumberDto ,ChnagePasswordDto} from '@dtos/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { ResetPasswordDto } from '@/dtos/auth/auth.dto';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.post(this.path + '/sign-up', 
      validationMiddleware(SignUpDto, 'body'),
      // authMiddleware, 
      this.authController.userRegister)

    this.router.post(this.path + '/login', 
      validationMiddleware(LoginDto, 'body'),
      // authMiddleware, 
      this.authController.login);

    this.router.get(this.path + '/logout', 
      authMiddleware, 
      this.authController.logout);

    this.router.post(this.path + '/mobile-login', 
      validationMiddleware(MobileLoginDto, 'body'),
      // authMiddleware, 
      this.authController.mobileLogin);

    this.router.post(this.path + '/verify-otp', 
      validationMiddleware(OtpDto, 'body'),
      // authMiddleware, 
      this.authController.verifyotp)

    this.router.post(this.path + '/forgot-password', 
      validationMiddleware(ForgotPasswordDto, 'body'), 
      //  authMiddleware, 
      this.authController.forgotpassowrd);

    this.router.post(this.path + '/verify-email-otp', 
      //  authMiddleware, 
      this.authController.verifyEmailOtp);

    this.router.post(this.path + '/reset-password', 
      validationMiddleware(ResetPasswordDto, 'body'), 
     authMiddleware, 
      this.authController.resetpassowrd);

      this.router.post(this.path + '/new-password', 
      validationMiddleware(ChangePasswordwithNumberDto, 'body'), 
      //  authMiddleware, 
      this.authController.newpassword);

      this.router.post(this.path + '/verify-new-password-otp', 
      //  authMiddleware, 
      this.authController.verifypasswordotp);

      this.router.post(this.path + '/change-password', 
      validationMiddleware(ChnagePasswordDto, 'body'), 
     authMiddleware, 
      this.authController.changepassword);
      

  }
}

export default AuthRoute;
