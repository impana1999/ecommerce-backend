import { Request, Response } from 'express';
import { HomepageService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';

export default class HomepageController {
  private homepageService = new HomepageService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */
  public getBanners = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const banners = await this.homepageService.getBanners();
    ApiResponse.successResponseWithData(res, "Banners fetched successfully", banners);
  });

  public getServices = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const services = await this.homepageService.getServices();
    ApiResponse.successResponseWithData(res, "Services fetched successfully", services);
  });

  public getFeaturedProducts = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const products = await this.homepageService.getFeaturedProducts();
    ApiResponse.successResponseWithData(res, "Featured products fetched successfully", products);
  });

  public getUpcomingTournaments = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const tournaments = await this.homepageService.getUpcomingTournaments();
    ApiResponse.successResponseWithData(res, "Tournaments fetched successfully", tournaments);
  });

  public getUpcomingEvents = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const events = await this.homepageService.getUpcomingEvents();
    ApiResponse.successResponseWithData(res, "Events fetched successfully", events);
  });

}
