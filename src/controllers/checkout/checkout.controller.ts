import { Request, Response } from 'express';
import { CheckOutService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class CheckOutController {
  private CheckoutService = new CheckOutService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */


  

  public proceedCheckout = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.CheckoutService.ProceedCheckout(req.body);
    ApiResponse.successResponseWithData(res, "Proceeded Checkout successfully", data);
  });
  public removeById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const Id = req.params.id;
    const data = await this.CheckoutService.removeItmeById(Id);
    ApiResponse.successResponse(res, 'Cart Item deleted by id Successfully');
  });
  public getAllUserCheckout = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userid=req.params.id
    const userCart = await this.CheckoutService.fetchUserCheckout(userid)
    ApiResponse.successResponseWithData(res, "Get user data sucessfully", userCart)
  })
  public beforeCheckout = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userCart = await this.CheckoutService.beforeCheckout(req.body)
    ApiResponse.successResponseWithData(res, "Get user data sucessfully", userCart)
  })
  public getbeforeCheckout = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userid=req.params.id
    const userCart = await this.CheckoutService.getbeforecheckout(userid)
    ApiResponse.successResponseWithData(res, "Get user data sucessfully", userCart)
  })
  
}
