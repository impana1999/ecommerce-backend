import { Router } from 'express';
import { OrdersController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import { OrderDto } from '@/dtos/index';
import validationMiddleware from '@middlewares/validation.middleware';

class OderRoute implements Routes {
  public path = '/order';
  public router = Router();
  public OrdersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create', authMiddleware, validationMiddleware(OrderDto, 'body'), this.OrdersController.createorder);
    this.router.post(this.path + '/gettokens/:customerId', authMiddleware, this.OrdersController.gettokens);
    this.router.get(this.path + '/getMyorders/:userId', authMiddleware, this.OrdersController.getMyorders);
    this.router.get(this.path + '/get-orders/:orderId', authMiddleware, this.OrdersController.getorders);
    this.router.post(this.path + '/cancelOrder/:orderId', authMiddleware, this.OrdersController.CancelOrder);
    this.router.get(this.path + '/getCancelOrder/:userId', authMiddleware, this.OrdersController.getCancelOrder);
    this.router.get(this.path + '/getAllorders', authMiddleware, this.OrdersController.getAllorders);
    
    
    
  
  }
  
}

export default OderRoute;
