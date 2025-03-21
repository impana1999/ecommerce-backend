import { Request, Response } from 'express';
import { OrdersService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';

export default class OrdersController {
  private OrdersService = new OrdersService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */
  public createorder = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const orders = await this.OrdersService.createOrder(req.body);
    ApiResponse.successResponseWithData(res, "order created successfully", orders);
  });
  public gettokens = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const customerId=req.params.customerId
    const orders = await this.OrdersService.gettokens(customerId,req.body);
    ApiResponse.successResponseWithData(res, "Banners fetched successfully", orders);
  });
  public getMyorders = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId=req.params.userId
    const orders = await this.OrdersService.getMyorders(userId);
    ApiResponse.successResponseWithData(res, "Orders fetched successfully", orders);
  });
  public getorders = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const orderId=req.params.orderId
    const orders = await this.OrdersService.getorders(orderId);
    ApiResponse.successResponseWithData(res, "order fetched successfully", orders);
  });
  public CancelOrder = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const orderId=req.params.orderId
    const orders = await this.OrdersService.CancelOrder(orderId);
    ApiResponse.successResponseWithData(res, "order fetched successfully", orders);
  });
  public getCancelOrder = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId=req.params.userId
    const data = await this.OrdersService.getCancelOrder(userId);
    ApiResponse.successResponseWithData(res, "order fetched successfully", data);
  });
  public getAllorders = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.OrdersService.getAllorders();
    ApiResponse.successResponseWithData(res, "order fetched successfully", data);
  });
  
  
}
