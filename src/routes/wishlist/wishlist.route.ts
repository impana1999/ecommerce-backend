import { Router } from 'express';
import { WishlistController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import { WhisshlistDto } from '@/dtos/index'
import validationMiddleware from '@middlewares/validation.middleware';

class wishlistRoute implements Routes {
  public path = '/wishlist';
  public router = Router();
  public WishlistController = new WishlistController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create', authMiddleware, validationMiddleware(WhisshlistDto, 'body'), this.WishlistController.createWhishlist);
    this.router.delete(this.path + '/remove-item/:listId', authMiddleware, this.WishlistController.removeWhishlist);
    this.router.get(this.path + '/fetch-userWishlist/:userId', authMiddleware, this.WishlistController.fetchUserWishlist);

  }

}

export default wishlistRoute;
