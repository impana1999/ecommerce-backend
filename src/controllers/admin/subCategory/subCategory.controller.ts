import { Request, Response } from 'express';
import { SubCategoryService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';


export default class SubCategoryController {
    private subCategoryService = new SubCategoryService();

    public subCategoryCreate = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.subCategoryService.createSubCategory(req.body);
        ApiResponse.successResponseWithData(res, 'Create a suCategory successfully', { data });
      });
    
      public getallSubCategories = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.subCategoryService.getAllSubCategories();
        ApiResponse.successResponseWithData(res, 'Get all subCategories successfully', data);
      });
    
      public getallSubCategoriesShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.subCategoryService.getAllSubCategoriesShort();
        ApiResponse.successResponseWithData(res, 'Get all subCategories  Id  and name successfully', data);
      });
    
      public getSingleSubCategoryById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const subCategoryId = req.params.subCategoryId;
        const data = await this.subCategoryService.getSingleSubCategoryById(subCategoryId);
        ApiResponse.successResponseWithData(res, 'Get single subCategory by Id and name successfully', data);
      });
    
      public removeSubCategorybyId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const subCategoryId = req.params.subCategoryId;
        const data = await this.subCategoryService.RemoveSubCategoryById(subCategoryId);
        ApiResponse.successResponse(res, 'SubCategory removed from database successfully');
      });
    
      public updateSubCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const subCategoryId = req.params.subCategoryId;
        const updatedData = await this.subCategoryService.updateSubCategoryById(subCategoryId, req.body);
        ApiResponse.successResponseWithData(res, 'SubCategory updated successfully', updatedData);
      });

      // author Vishal
      public getallSubCategoriesByCategoryId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.subCategoryService.getAllSubCategoryByCategoryId(req.params.categoryId);
        ApiResponse.successResponseWithData(res, 'Get all subCategories by categoryId successfully', data);
      });

      public getallSubCategoriesNameByCategoryId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.subCategoryService.getAllSubCategoryNameByCategoryId(req.params.categoryId);
        ApiResponse.successResponseWithData(res, 'Get all subCategories by categoryId successfully', data);
      });
}