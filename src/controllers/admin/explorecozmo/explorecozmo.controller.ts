import { Request, Response } from 'express';
import { ExploreCozmoServices } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';


export default class ExploreCozmoController {
    private ExploreCozmoServices = new ExploreCozmoServices();

    public exploreCreate = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.ExploreCozmoServices.explorecreate(req.body);
        ApiResponse.successResponseWithData(res, 'Create a explorecozmo successfully', { data });
      });
    
      public getallexploreCozmo = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.ExploreCozmoServices.getallexplorecozmo();
        ApiResponse.successResponseWithData(res, 'Get all explorecozmo successfully', data);
      });
    
      public getallexplorecozmoShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.ExploreCozmoServices.getallexploreCozmoShort();
        ApiResponse.successResponseWithData(res, 'Get all explorecozmo  Id  and name successfully', data);
      });
    
      public getSingleexplorecozmoById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const explorecozmoId = req.params.exploreId
        const data = await this.ExploreCozmoServices.getSingleexploreCozmoById(explorecozmoId);
        ApiResponse.successResponseWithData(res, 'Get single cozmoserviceService by Id  successfully', data);
      });
    
      public removeexplorecozmobyId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const explorecozmoId = req.params.exploreId;
        const data = await this.ExploreCozmoServices.removeexplorecozmobyId(explorecozmoId);
        ApiResponse.successResponse(res, 'explorecozmo removed from database successfully');
      });
    
      public updateexplorecozmo = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const explorecozmoId = req.params.exploreId;
        const updatedData = await this.ExploreCozmoServices.updateexplorecozmo(explorecozmoId, req.body);
        ApiResponse.successResponseWithData(res, 'explorecozmo updated successfully', updatedData);
      });
}