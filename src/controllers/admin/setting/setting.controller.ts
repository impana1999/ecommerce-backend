import { Request, Response } from 'express';
import { AdminSettingServices } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';


export default class AdminSettingController {
    private AdminSettingServices = new AdminSettingServices();

    public createsetting = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.AdminSettingServices.createsetting(req.body);
        ApiResponse.successResponseWithData(res, 'Create a setting Successfully', { data });
      });
    
      public AboutUsSetting = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.AdminSettingServices.getAboutUsSetting();
        ApiResponse.successResponseWithData(res, 'Get AboutUs Successfully', data);
      });
    
      public Privacypolicy = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.AdminSettingServices.Privacypolicy();
        ApiResponse.successResponseWithData(res, 'Get PrivacyPolicy Successfully', data);
      });
    
      public termsandCondition = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.AdminSettingServices.termsandCondition();
        ApiResponse.successResponseWithData(res, 'Get terms and condition  Successfully', data);
      });
    
      public updatesetting = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const settingid = req.params.id;
        const data = await this.AdminSettingServices.updatesetting(settingid,req.body);
        ApiResponse.successResponse(res, 'setting updated Successfully');
      });
    
      public deletesetting = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const Id = req.params.id;
        const data = await this.AdminSettingServices.deletesetting(Id);
        ApiResponse.successResponseWithData(res, 'setting deleted successfully', data);
      });
}