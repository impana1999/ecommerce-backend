import { Router } from 'express';
import { CozmoServiceController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import {CozmoServiceDto,UpdateCozmoServiceDto} from '@dtos/admin/index';

class CozmoServiceRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public cozmoserviceController = new CozmoServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-Service', validationMiddleware(CozmoServiceDto, 'body'), authMiddleware, this.cozmoserviceController.CozmoServiceCreate);

    this.router.get(this.path + '/get-all-CozmoService', authMiddleware, this.cozmoserviceController.getallCozmoService);

    this.router.get(this.path + '/get-all-CozmoService-short', authMiddleware, this.cozmoserviceController.getallcozmoserviceShort);

    this.router.get(this.path + '/get-CozmoService/:cozmoserviceId', authMiddleware, this.cozmoserviceController.getSinglecozmoserviceById);

    this.router.delete(this.path + '/delete-cozmoservice/:cozmoserviceId', authMiddleware, this.cozmoserviceController.removecozmoservicebyId);

    this.router.post(this.path + '/update-cozmoservice/:cozmoserviceId', validationMiddleware(UpdateCozmoServiceDto, 'body'), this.cozmoserviceController.updatecozmoservice);
  }
}

export default CozmoServiceRoute;
