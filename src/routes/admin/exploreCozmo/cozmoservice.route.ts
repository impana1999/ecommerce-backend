import { Router } from 'express';
import { ExploreCozmoController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import {UpdateExploreCozmoDto,ExploreCozmoDto} from '@dtos/admin/index';

class ExploreCozmoRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public ExploreCozmoController = new ExploreCozmoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-explore', validationMiddleware(ExploreCozmoDto, 'body'), authMiddleware, this.ExploreCozmoController.exploreCreate);

    this.router.get(this.path + '/get-all-explore', authMiddleware, this.ExploreCozmoController.getallexploreCozmo);

    this.router.get(this.path + '/get-all-explore-short', authMiddleware, this.ExploreCozmoController.getallexplorecozmoShort);

    this.router.get(this.path + '/get-explore/:exploreId', authMiddleware, this.ExploreCozmoController.getSingleexplorecozmoById);

    this.router.delete(this.path + '/delete-explore/:exploreId', authMiddleware, this.ExploreCozmoController.removeexplorecozmobyId);

    this.router.post(this.path + '/update-explore/:exploreId', validationMiddleware(UpdateExploreCozmoDto, 'body'), this.ExploreCozmoController.updateexplorecozmo);
  }
}

export default ExploreCozmoRoute;
