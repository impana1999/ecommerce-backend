import { Router } from 'express';
import { BannerAuthController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { BannerDto,UpdateBannerDto } from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AdminBannerRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public bannerAuthController = new BannerAuthController();

  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.post(this.path + '/add-banner', validationMiddleware(BannerDto, 'body'),authMiddleware, this.bannerAuthController.createbanner)
    this.router.get(this.path + '/banners', authMiddleware, this.bannerAuthController.getallbanners);
    this.router.get(this.path + '/banner/:bannerId',
   // authMiddleware, 
    this.bannerAuthController.getbannerbyid);
    this.router.post(this.path + '/update-banner/:bannerId', validationMiddleware(UpdateBannerDto, 'body'),authMiddleware, this.bannerAuthController.updatbannerbyid)
    this.router.delete(this.path + '/delete-banner/:bannerId',authMiddleware, this.bannerAuthController.removebannerbyid)

  }
}

export default AdminBannerRoute;
  