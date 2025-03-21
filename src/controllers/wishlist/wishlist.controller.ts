import { Request, Response } from 'express';
import { AdminLocationService } from '@services/admin/index';
import { WishlistService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class WishlistController {
  private WishlistService = new WishlistService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */


  

  public createWhishlist = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const wishlist = await this.WishlistService.addToWishlist(req.body);
    ApiResponse.successResponseWithData(res, "Created a Item in wishlist successfully", wishlist);
  });

  public removeWhishlist = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const wishlistId = req.params.listId;
    const data = await this.WishlistService.removeList(wishlistId);
    ApiResponse.successResponse(res, 'Whishlist Removed Successfully');
  });
  public fetchUserWishlist = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const userCart = await this.WishlistService.fetchUserWishlistById(userId)
    ApiResponse.successResponseWithData(res, "Get user cart sucessfully", userCart)
  })
}
