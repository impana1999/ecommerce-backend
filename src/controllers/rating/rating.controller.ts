import { RatingService } from '@services/index';
import catchAsync from "@/utils/async";
import { Request, Response } from 'express';
import * as ApiResponse from '@utils/ApiResponse';

export default class RatingController{
    private ratingService=new RatingService();
/**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */

public createRating = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const rating = await this.ratingService.addProductRatingByUser(req.body);
    ApiResponse.successResponseWithData(res, "Rating created successfully", rating);
  });

  public fetchproductRatingById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const data = await this.ratingService.fetchproductRatingById(userId);
    ApiResponse.successResponseWithData(res, 'Get individual rating by user id successfully', data);
  });



  public hideRatingByAdminPanel = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const ratingId = req.params.ratingId;
    const updatedData = await this.ratingService.hideRatingByAdminPanel(ratingId);
    ApiResponse.successResponseWithData(res, 'Rating data updated Successfully', updatedData);
  });


  public softDeleteRatingbyId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const data = await this.ratingService.softDeleteRatingByUser(userId);
    ApiResponse.successResponse(res, 'rating delete by userId Successfully');
  });

  public getAllratingsByProductId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const data = await this.ratingService.getAllratingsByProductId(productId);
    ApiResponse.successResponseWithData(res, 'Get all ratings by productId successfully', data);
  });
  public fetcheventRatingById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const data = await this.ratingService.fetchEventRatingById(userId);
    ApiResponse.successResponseWithData(res, 'Get all ratings by productId successfully', data);
  });
  public getallratingsByEventId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const eventId = req.params.eventId;
    const data = await this.ratingService.getAllratingsByEventId(eventId);
    ApiResponse.successResponseWithData(res, 'Get all ratings by event successfully', data);
  });
  public likeRating = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const ratingId = req.params.ratingId;
    const data = await this.ratingService.likeRating(ratingId,req.body);
    ApiResponse.successResponseWithData(res, 'Liked successfully', data);
  });
  public dlikeRating = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const ratingId = req.params.ratingId;
    const data = await this.ratingService.dislikeRating(ratingId,req.body);
    ApiResponse.successResponseWithData(res, 'Disliked successfully', data);
  });
  
  public undlikeRating = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const ratingId = req.params.ratingId;
    const data = await this.ratingService.undislikeRating(ratingId,req.body);
    ApiResponse.successResponseWithData(res, 'Un dislike successfully', data);
  });
  public unlikeRating = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const ratingId = req.params.ratingId;
    const data = await this.ratingService.unlikeRating(ratingId,req.body);
    ApiResponse.successResponseWithData(res, 'Unlike Done successfully', data);
  });
  public totalrate = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const data = await this.ratingService.totalRate(productId);
    ApiResponse.successResponseWithData(res, 'Get all ratings product successfully', data);
  });
  public geteventrating = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.ratingService.geteventrating();
    ApiResponse.successResponseWithData(res, 'Get all ratings event successfully', data);
  });
  public deleterating = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const Id = req.params.id;
    const data = await this.ratingService.deleterating(Id);
    ApiResponse.successResponseWithData(res, 'data fetched successfully', data);
  });
  
}