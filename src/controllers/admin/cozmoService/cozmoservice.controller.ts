import { Request, Response } from 'express';
import { CozmoServiceServices } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';


export default class CozmoServiceController {
    private cozmoserviceService = new CozmoServiceServices();

    public CozmoServiceCreate = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.cozmoserviceService.CozmoServiceCreate(req.body);
        ApiResponse.successResponseWithData(res, 'Create a cozmoserviceService successfully', { data });
      });
    
      public getallCozmoService = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.cozmoserviceService.getallCozmoService();
        ApiResponse.successResponseWithData(res, 'Get all cozmoserviceService successfully', data);
      });
    
      public getallcozmoserviceShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.cozmoserviceService.getallCozmoServiceShort();
        ApiResponse.successResponseWithData(res, 'Get all cozmoserviceService  Id  and name successfully', data);
      });
    
      public getSinglecozmoserviceById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const cozmoserviceId = req.params.cozmoserviceId
        const data = await this.cozmoserviceService.getSingleCozmoServiceById(cozmoserviceId);
        ApiResponse.successResponseWithData(res, 'Get single cozmoserviceService by Id  successfully', data);
      });
    
      public removecozmoservicebyId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const cozmoserviceId = req.params.cozmoserviceId;
        const data = await this.cozmoserviceService.removeCozmoServicebyId(cozmoserviceId);
        ApiResponse.successResponse(res, 'CozmoserviceService removed from database successfully');
      });
    
      public updatecozmoservice = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const cozmoserviceId = req.params.cozmoserviceId;
        const updatedData = await this.cozmoserviceService.updateCozmoService(cozmoserviceId, req.body);
        ApiResponse.successResponseWithData(res, 'cozmoserviceService updated successfully', updatedData);
      });
}