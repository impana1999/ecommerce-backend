import { Request, Response } from 'express';
import { PackageService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class PackageController {
  private packageService = new PackageService();

  public packageCreater = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.packageService.createPackage(req.body);
    ApiResponse.successResponseWithData(res, 'Package created successfully', data);
  });

  public getallpackages = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.packageService.getAllPackages();
    ApiResponse.successResponseWithData(res, 'Get all packages successfully', data);
  });

  public getAllPackagesShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.packageService.getAllPackagesShort();
    ApiResponse.successResponseWithData(res, 'Get all packages short successfully', data);
  });

  public getSinglePackageById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const packageId = req.params.id;
    const data = await this.packageService.getSinglePackageById(packageId);
    ApiResponse.successResponseWithData(res, 'Package get by id successfully', data);
  });

  public getPackagesByEventType = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const eventType = req.params.type;
    const data = await this.packageService.getPackagesByEventType(eventType);
    ApiResponse.successResponseWithData(res, 'Packages by event type fetched successfully', data);
  });

  public updatePackageById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const packageId = req.params.id;
    const data = await this.packageService.updatePackageById(packageId, req.body);
    ApiResponse.successResponseWithData(res, 'Package data updated successfully', data);
  });

  public removePackageById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const packageId = req.params.id;
    const data = await this.packageService.removePackageById(packageId);
    ApiResponse.successResponse(res, 'Package data removed successfully');
  });
}
