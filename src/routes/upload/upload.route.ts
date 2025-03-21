import { Router } from 'express';
import { UploadController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import upload from '../../helpers/s3-upload.helper';
import { userRequestMiddleware } from '@/middlewares/central.middleware';

export default class UploadRoute implements Routes {
  public path = '/upload/';
  public router = Router();
  public uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}image`, 
    userRequestMiddleware,
    authMiddleware, 
    upload.single('image'),
    this.uploadController.uploadSingleImage);
  }
}
