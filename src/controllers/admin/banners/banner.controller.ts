import { Request, Response } from 'express';
import { BannerAuthService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class BannerAuthController {
  private bannerAuthService = new BannerAuthService();

  public createbanner = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bookingData = await this.bannerAuthService.createBanner(req.body);
    ApiResponse.successResponseWithData(res, 'Banner Created Successfully', bookingData);
  });

  public getallbanners = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.bannerAuthService.getAllBanners();

      ApiResponse.successResponseWithData(res, 'Getting All Banners', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public getbannerbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = req.params.bannerId;

      const data = await this.bannerAuthService.getBannerById(bannerId);

      ApiResponse.successResponseWithData(res, 'Get Single  Banner Details', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public updatbannerbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = req.params.bannerId;
      //const { title,text,subText, imageUrl,description,expiryDate,active, status } = req.body;

      const data = await this.bannerAuthService.updateBannerById(bannerId, req.body);

      ApiResponse.successResponseWithData(res, 'Successfully updated Banner', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public removebannerbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = req.params.bannerId;

      await this.bannerAuthService.removeBannerById(bannerId);

      ApiResponse.successResponse(res, 'Banner Removed Successfully');
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });
}
