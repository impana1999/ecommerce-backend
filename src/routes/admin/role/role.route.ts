import { Router } from 'express';
import {  RoleController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import {RoleDto,UpadateRoleDto} from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';




class AdminRoleAuthRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public adminRoleAuthController = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-role',
      validationMiddleware(RoleDto,'body'),
    authMiddleware,
    this.adminRoleAuthController.roleCreater)
 
    this.router.get(this.path + '/get-role/:id',
      authMiddleware,
    this.adminRoleAuthController.getbyid)

    this.router.delete(this.path + '/delete-role/:id',
    authMiddleware,
    this.adminRoleAuthController.deletebyid)
 
    this.router.get(this.path + '/get-all-roles',
    authMiddleware,
    this.adminRoleAuthController.getallroles)

    this.router.get(this.path + '/get-all-roles-short',
    authMiddleware,
    this.adminRoleAuthController.getAllrolesShort)
 
   
    this.router.post(this.path + '/update-role/:roleId',
    validationMiddleware(UpadateRoleDto,'body'),
    authMiddleware,
   this.adminRoleAuthController.updatePermission)
  }
}

export default AdminRoleAuthRoute;