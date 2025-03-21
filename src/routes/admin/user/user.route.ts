import { Router } from 'express';
import { AdminUserController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { authMiddleware, authorizeMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { UpdateUSerDto } from '@/dtos/admin/index';
import { AuthController } from '@/controllers';

class AdminUserRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public adminUserController = new AdminUserController();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
    this.router.post(this.path + '/add-user',    this.authController.userRegister);
    this.router.get(this.path + '/users', authMiddleware,  this.adminUserController.getallusers);
    this.router.get(this.path + '/user/:userId', authMiddleware,  this.adminUserController.getuserbyid);
    this.router.post(this.path + '/update-user/:userId', validationMiddleware(UpdateUSerDto, 'body'), authMiddleware,  this.adminUserController.updateuserbyid);
    this.router.delete(this.path + '/delete-user/:userId', authMiddleware,  this.adminUserController.removeuserbyid);
  }
}

export default AdminUserRoute;
