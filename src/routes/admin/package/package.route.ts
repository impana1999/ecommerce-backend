import { Router } from 'express';
import { PackageController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { PackageDto, UpdatePackageDto } from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class PackageRoute implements Routes {
  public path = '/admin/package';
  public router = Router();
  public packageController = new PackageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create', validationMiddleware(PackageDto, 'body'), authMiddleware, this.packageController.packageCreater);

    this.router.get(this.path + '/get-all', authMiddleware, this.packageController.getallpackages);

    this.router.get(this.path + '/get-all-short', authMiddleware, this.packageController.getAllPackagesShort);

    this.router.get(this.path + '/get/:id', authMiddleware, this.packageController.getSinglePackageById);

    this.router.get(this.path + '/get-by-event-type/:type', authMiddleware, this.packageController.getPackagesByEventType);

    this.router.post(this.path + '/update/:id', validationMiddleware(UpdatePackageDto, 'body'), this.packageController.updatePackageById);

    this.router.delete(this.path + '/delete/:id', authMiddleware, this.packageController.removePackageById);
  }
}

export default PackageRoute;
