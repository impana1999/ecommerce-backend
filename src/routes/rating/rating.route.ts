import { Router } from 'express';

import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { RatingController } from '@/controllers';
import {UpdateRatingDto} from '@dtos/index'

class RatingRoute implements Routes{
    public path = '/rating';
    public router = Router();
    public ratingController = new RatingController();

    constructor() {
        this.initializeRoutes();
      }
      private initializeRoutes(){
        this.router.post(this.path + '/create', authMiddleware,validationMiddleware(UpdateRatingDto,'body'), this.ratingController.createRating);

        this.router.get(this.path + '/get-product-rating/:userId', authMiddleware, this.ratingController.fetchproductRatingById);

        this.router.post(
            this.path + '/hide-rating-by-admin/:ratingId',
            
            authMiddleware,
            this.ratingController.hideRatingByAdminPanel,
          );

          this.router.post(
            this.path + '/soft-delete-rating-by-id/:userId',
            
            authMiddleware,
            this.ratingController.softDeleteRatingbyId,
          );

        this.router.get(this.path + '/get-all-ratings/:productId', authMiddleware, this.ratingController.getAllratingsByProductId);


        this.router.get(this.path + '/get-all-rating/:eventId', authMiddleware, this.ratingController.getallratingsByEventId);
        this.router.post(this.path + '/like-Rating/:ratingId', authMiddleware, this.ratingController.likeRating);
        this.router.post(this.path + '/dislike-Rating/:ratingId', authMiddleware, this.ratingController.dlikeRating);
        this.router.post(this.path + '/unlike-Rating/:ratingId', authMiddleware, this.ratingController.unlikeRating);
        this.router.post(this.path + '/undislike-Rating/:ratingId', authMiddleware, this.ratingController.undlikeRating);
        this.router.post(this.path + '/totalratingreviews/:productId', authMiddleware, this.ratingController.totalrate);
        this.router.get(this.path + '/getAllEventRating', authMiddleware, this.ratingController.geteventrating);
        this.router.delete(this.path + '/delete-rating/:id', authMiddleware, this.ratingController.deleterating);
        
      }

}

export default RatingRoute;