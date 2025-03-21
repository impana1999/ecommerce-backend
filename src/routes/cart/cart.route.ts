import { Router } from 'express';
import { CartController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import { CartDto } from '@/dtos/index';
import { BookingDto, UpdateBookingDto } from '@/dtos/index';
import validationMiddleware from '@middlewares/validation.middleware';

class CartRoute implements Routes {
  public path = '/cart';
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create', authMiddleware, validationMiddleware(CartDto, 'body'), this.cartController.createCart);

    this.router.delete(this.path + '/delete-cart-item/:cartId', authMiddleware, this.cartController.removeById);
    this.router.get(this.path + '/fetch-userCart/:userId', authMiddleware, this.cartController.fetchUserCartFromUserId);

    this.router.post(this.path + '/update-cart-quantity/:cartId', authMiddleware, this.cartController.updateQuantity);

  }

}

export default CartRoute;
