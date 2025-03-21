import { Router } from 'express';
import { AdminSettingController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import {UpdateAdminSettingDto,AdminSettingDto} from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AdminSettingRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public AdminSettingController = new AdminSettingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-setting', validationMiddleware(AdminSettingDto, 'body'), authMiddleware, this.AdminSettingController.createsetting);
    this.router.get(this.path + '/get-AboutUsSetting', authMiddleware, this.AdminSettingController.AboutUsSetting);
    this.router.get(this.path + '/get-Privacypolicy', authMiddleware, this.AdminSettingController.Privacypolicy);
    this.router.get(this.path + '/get-termsandCondition', authMiddleware, this.AdminSettingController.termsandCondition);
    this.router.post(this.path + '/update-setting/:id',  validationMiddleware(UpdateAdminSettingDto, 'body'),authMiddleware, this.AdminSettingController.updatesetting);
    this.router.delete(this.path + '/delete-setting/:id', authMiddleware, this.AdminSettingController.deletesetting)
  }
}

export default AdminSettingRoute;
