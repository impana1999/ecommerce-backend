import { Request, Response } from 'express';
import { AdminLocationService } from '@services/admin/index';
import { CartService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class CartController {
  private cartService = new CartService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */


  

  public createCart = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const cart = await this.cartService.addToCart(req.body);
    ApiResponse.successResponseWithData(res, "Created a Item in Cart successfully", cart);
  });

  public removeById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.cartId;
    const data = await this.cartService.removeItmeById(cartId);
    ApiResponse.successResponse(res, 'Cart Item deleted by id Successfully');
  });



  public fetchUserCartFromUserId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const userCart = await this.cartService.fetchUserCartFromUserId(userId)
    ApiResponse.successResponseWithData(res, "Get user cart sucessfully", userCart)
  })

  public updateQuantity = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const cartId = req.params.cartId;
      const data = await this.cartService.updateQuantity(cartId, req.body);
      ApiResponse.successResponseWithData(res, 'Successfully updated cart Quantity', data);

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

}
