import { Request, Response } from 'express';
import { CategoryService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';


export default class CategoryController {
    private categoryService = new CategoryService();

    public categoryCreate = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.categoryService.createCategory(req.body);
        ApiResponse.successResponseWithData(res, 'Create a category successfully', { data });
      });
    
      public getallCategories = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.categoryService.getAllCategories();
        ApiResponse.successResponseWithData(res, 'Get all categories successfully', data);
      });
    
      public getallCategoriesShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const data = await this.categoryService.getAllCategoriesShort();
        ApiResponse.successResponseWithData(res, 'Get all categories  Id  and name successfully', data);
      });
    
      public getSingleCategoryById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.categoryId
        const data = await this.categoryService.getSingleCategoryById(categoryId);
        ApiResponse.successResponseWithData(res, 'Get single category by Id  successfully', data);
      });
    
      public removeCategorybyId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.categoryId;
        const data = await this.categoryService.RemoveCategoryById(categoryId);
        ApiResponse.successResponse(res, 'Category removed from database successfully');
      });
    
      public updateCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.categoryId;
        const updatedData = await this.categoryService.updateCategoryById(categoryId, req.body);
        ApiResponse.successResponseWithData(res, 'Category updated successfully', updatedData);
      });
}