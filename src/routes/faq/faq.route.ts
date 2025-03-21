import { Router } from 'express';
import { FaqController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import { FaqDto } from '@/dtos/index';
import { BookingDto, UpdateBookingDto } from '@/dtos/index';
import validationMiddleware from '@middlewares/validation.middleware';

class FaqRoute implements Routes {
  public path = '/faq';
  public router = Router();
  public FaqController = new FaqController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create', authMiddleware, validationMiddleware(FaqDto, 'body'), this.FaqController.createFaq);
    this.router.get(this.path + '/get-faq', authMiddleware, this.FaqController.getAllFaq);
    this.router.delete(this.path + '/delete-faq/:id', authMiddleware, this.FaqController.deletFaq);
    this.router.post(this.path + '/update-faq/:id', authMiddleware, this.FaqController.updatefaqById);
    
    
  }

}

export default FaqRoute;
