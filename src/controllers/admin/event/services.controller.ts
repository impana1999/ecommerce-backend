import { Request, Response } from 'express';
import { ServicesAuthService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class ServicesAuthController {
  private servicesAuthService = new ServicesAuthService();

  public servicecreate = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bookingData = await this.servicesAuthService.serviceCreate(req.body);
    ApiResponse.successResponseWithData(res, 'Service Added Successfully', bookingData);
  });

  public getallservices = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.servicesAuthService.getAllServices();

      ApiResponse.successResponseWithData(res, 'Getting All Services', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public getservicebyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const serviceId = req.params.serviceId;

      const data = await this.servicesAuthService.getServiceById(serviceId);

      ApiResponse.successResponseWithData(res, 'Get Single  Service', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public updatservicebyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const serviceId = req.params.serviceId;
      const { name, imageUrl, type, details } =
        req.body;

      const data = await this.servicesAuthService.updateServiceById(serviceId, {
       name, imageUrl, type, details
      });

      ApiResponse.successResponseWithData(res, 'Successfully updated Service', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public removeservicebyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const serviceId = req.params.serviceId;

      await this.servicesAuthService.removeServiceById(serviceId);

      ApiResponse.successResponse(res, 'Service Removed Successfully');
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });
}
