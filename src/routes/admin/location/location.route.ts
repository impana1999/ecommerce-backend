import { Router } from 'express';
import { AdminLocationAuthController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
 
 
// import { SchoolEventBookDto} from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

 
 
// import { authMiddleware } from '@middlewares/auth.middleware';
// import validationMiddleware from '@middlewares/validation.middleware';
import { LocationUpdateDto,CreateLocationDto } from '@dtos/admin/index';


class AdminLocationAuthRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public adminLocationAuthController = new AdminLocationAuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-location',
     validationMiddleware(CreateLocationDto,'body'),
     authMiddleware,
    this.adminLocationAuthController.locationCreater)

    this.router.get(this.path + '/get-all-locations', 
    authMiddleware,
    this.adminLocationAuthController.getAllLocation)

    this.router.get(this.path + '/get-all-locations-short',
    authMiddleware, 
    this.adminLocationAuthController.getAllLocationShort)

    this.router.get(this.path + '/get-location/:id',
    authMiddleware,
    this.adminLocationAuthController.fetchLocation);
    
    this.router.post(this.path + '/update-location/:locationId',
      validationMiddleware(LocationUpdateDto, 'body'),
      authMiddleware,
      this.adminLocationAuthController.updatlocationbyid,
    );

    this.router.delete(this.path + '/delete-location/:locationId',
      authMiddleware,
      this.adminLocationAuthController.removeLocationById,
    );
  }
 
}
export default AdminLocationAuthRoute;
