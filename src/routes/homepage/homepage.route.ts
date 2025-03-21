import { Router } from 'express';
import { HomepageController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware } from '@middlewares/auth.middleware';
// import { RefreshTokenDto, LoginDto, LogoutOtherDevicesDto, SignInDto, SignUpDto, VerifyEmailDto } from '@dtos/index';
import validationMiddleware from '@middlewares/validation.middleware';

class HomepageRoute implements Routes {
  public path = '/homepage';
  public router = Router();
  public homepageController = new HomepageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path + '/get-banners', 
      // validationMiddleware('body'), 
      authMiddleware,
      this.homepageController.getBanners);
    this.router.get(this.path + '/get-services', 
      // validationMiddleware('body'), 
      authMiddleware,
      this.homepageController.getServices);
    this.router.get(this.path + '/get-featured-products', 
      // validationMiddleware('body'), 
      authMiddleware,
      this.homepageController.getFeaturedProducts);
    this.router.get(this.path + '/get-upcoming-tournaments', 
      // validationMiddleware('body'), 
      authMiddleware,
      this.homepageController.getUpcomingTournaments);
    this.router.get(this.path + '/get-upcoming-events', 
      // validationMiddleware('body'), 
      authMiddleware,
      this.homepageController.getUpcomingEvents);
  }
}

export default HomepageRoute;
