import { Request, Response } from 'express';
import { ProductService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';

export default class ProductController {
  private productService = new ProductService();

  public productCreate = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.productService.createProduct(req.body);
    ApiResponse.successResponseWithData(res, 'Create a product successfully', data);
  });

  public getallProducts = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.productService.getAllProducts();
    ApiResponse.successResponseWithData(res, 'Get all prodcuts successfully', data);
  });
  public getAllProductsbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId=req.params.userId
    const data = await this.productService.getAllProductsbyid(userId);
    ApiResponse.successResponseWithData(res, 'Get all prodcuts successfully', data);
  });
  
  public getallproductsShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.productService.getAllProductsShort();
    ApiResponse.successResponseWithData(res, 'Get all prodcuts Id name and price successfully', data);
  });

  public getSingleProductById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const data = await this.productService.getSingleProductById(productId);
    ApiResponse.successResponseWithData(res, 'Get single prodcuts by Id  successfully', data);
  });

  public removeProductbyId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const data = await this.productService.RemoveProductById(productId);
    ApiResponse.successResponse(res, 'Product removed from database successfully');
  });

  public updateProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const updatedData = await this.productService.updateProductById(productId, req.body);
    ApiResponse.successResponseWithData(res, 'Product updated successfully', updatedData);
  });

  public getallProductsBySubacategoryId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const subCategoryId = req.params.subCategoryId;
    const data = await this.productService.getAllProductsBySubcategoryId(subCategoryId);
    ApiResponse.successResponseWithData(res, 'Get all prodcuts by subCategory id successfully', data);
  });

  public getallproductsBySubacategoryIdShort = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.productService.getAllProductsShortBySubCategoryId(req.body);
    ApiResponse.successResponseWithData(res, 'Get all prodcuts name and price  by subCategory Id  successfully', data);
  });

  public getfeaterproduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.productService.getFeaterProduct();
    ApiResponse.successResponseWithData(res, 'Get all featured product successfully',data);
  });
  
}

