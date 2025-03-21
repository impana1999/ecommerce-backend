import { Request, Response } from 'express';
import { AdminLocationService } from '@services/admin/index';
import { FaqService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class FaqController {
  private FaqService = new FaqService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */


  

  public createFaq = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const cart = await this.FaqService.createFaq(req.body);
    ApiResponse.successResponseWithData(res, "Faq Created successfully", cart);
  });

  public getAllFaq = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.FaqService.getAllFaq();
    ApiResponse.successResponseWithData(res, 'Faq fetched Successfully',data);
  });
  public deletFaq = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const Id=req.params.id
    const data = await this.FaqService.deletFaq(Id);
    ApiResponse.successResponseWithData(res, 'Faq fetched Successfully',data);
  });
  public updatefaqById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const Id=req.params.id
    const data = await this.FaqService.updatefaqById(Id,req.body);
    ApiResponse.successResponseWithData(res, 'Faq fetched Successfully',data);
  });
  
}
