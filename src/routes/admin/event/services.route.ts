import { Router } from 'express';
import { ServicesAuthController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { ServiceDto,UpdateServiceDto } from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AdminServicesRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public servicesAuthController = new ServicesAuthController();

  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.post(this.path + '/add-service', 
    validationMiddleware(ServiceDto, 'body'),
    authMiddleware, 
    this.servicesAuthController.servicecreate)
    this.router.get(this.path + '/services', 
    authMiddleware,  
    this.servicesAuthController.getallservices);
    this.router.get(this.path + '/service/:serviceId', 
    authMiddleware, 
    this.servicesAuthController.getservicebyid);
    this.router.post(this.path + '/update-service/:serviceId', 
    validationMiddleware(UpdateServiceDto, 'body'),
    authMiddleware, 
    this.servicesAuthController.updatservicebyid)
    this.router.delete(this.path + '/delete-service/:serviceId', 
    authMiddleware,
    this.servicesAuthController.removeservicebyid)

  }
}

export default AdminServicesRoute;
  