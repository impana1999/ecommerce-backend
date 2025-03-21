import { Request, Response } from 'express';
import { AdminLocationService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class AdminLocationAuthController {
  private adminLocationService = new AdminLocationService();

 

  public getAllLocation = catchAsync(async( req: Request, res : Response) : Promise<void> => {
    const allLocation = await this.adminLocationService.adminGetAllLocation()
    ApiResponse.successResponseWithData(res, "Get all locations sucessfully", allLocation)
  })

  public getAllLocationShort = catchAsync(async( req: Request, res : Response) : Promise<void> => {
    const data = await this.adminLocationService.adminGetAllShort()
    ApiResponse.successResponseWithData(res, "Get all locations fetched sucessfully", data)
  })
 
  public locationCreater = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const locationData = await this.adminLocationService.createLocation(req.body);
    ApiResponse.successResponseWithData(res, 'Create Location Successfully', locationData );
  });

  public fetchLocation= catchAsync(async (req: Request, res: Response): Promise<void> => {
    const locationId = req.params.id;
    const fetchLocationData = await this.adminLocationService.fetchLocationById(locationId);
    ApiResponse.successResponseWithData(res, 'Location fetched Successfully', fetchLocationData );
  });


  public removeLocationById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const locationId = req.params.locationId;
      await this.adminLocationService.deleteLocationById(locationId);
      ApiResponse.successResponse(res, 'Location Removed Successfully');
    } catch (err) {

      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }

  });

  public updatlocationbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const locationtId = req.params.locationId;
      const data = await this.adminLocationService.updateLocationById(locationtId, req.body);
      ApiResponse.successResponseWithData(res, 'Successfully updated Location', data);

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });


}
