import { Router } from 'express';
import { CheckOutController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import { CheckoutDto } from '@/dtos/index';
import { BookingDto, UpdateBookingDto } from '@/dtos/index';
import validationMiddleware from '@middlewares/validation.middleware';

class CheckoutRoute implements Routes {
  public path = '/checkout';
  public router = Router();
  public CheckOutController = new CheckOutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create', authMiddleware, validationMiddleware(CheckoutDto, 'body'), this.CheckOutController.proceedCheckout);
    this.router.get(this.path + '/getcheckout/:id', authMiddleware, this.CheckOutController.getAllUserCheckout);
    this.router.delete(this.path + '/delete/:id', authMiddleware, this.CheckOutController.removeById);
    this.router.post(this.path + '/beforecheckout', authMiddleware, this.CheckOutController.beforeCheckout);
    this.router.get(this.path + '/getbeforecheckout/:id', authMiddleware, this.CheckOutController.getbeforeCheckout);
    
  }
  
}

export default CheckoutRoute;
