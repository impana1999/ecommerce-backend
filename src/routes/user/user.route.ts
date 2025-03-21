import { Router } from 'express';
import { UserController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware } from '@middlewares/auth.middleware';
// import { RefreshTokenDto, LoginDto, LogoutOtherDevicesDto, SignInDto, SignUpDto, VerifyEmailDto } from '@dtos/index';
import validationMiddleware from '@middlewares/validation.middleware';

export default class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path + '/get-profile/:id', 
    authMiddleware, 
    this.userController.getprofile)

    this.router.post(this.path + '/update_profile/:id', 
    authMiddleware, 
    this.userController.updateprofile)


  }


}
