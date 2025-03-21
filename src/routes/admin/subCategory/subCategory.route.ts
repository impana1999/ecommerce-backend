import { Router } from 'express';
import { SubCategoryController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { SubCategoryDto,UpdateSubCategoryDto } from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class SubCategoryRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public subCategoryController = new SubCategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-sub-category', validationMiddleware(SubCategoryDto, 'body'), authMiddleware, this.subCategoryController.subCategoryCreate);

    this.router.get(this.path + '/get-all-sub-categories', authMiddleware, this.subCategoryController.getallSubCategories);

    this.router.get(this.path + '/get-all-sub-categories-short', authMiddleware, this.subCategoryController.getallSubCategoriesShort);

    this.router.get(this.path + '/get-sub-category/:subCategoryId', authMiddleware, this.subCategoryController.getSingleSubCategoryById);

    this.router.delete(this.path + '/delete-sub-category/:subCategoryId', authMiddleware, this.subCategoryController.removeSubCategorybyId);

    this.router.post(this.path + '/update-subCategory/:subCategoryId', validationMiddleware(UpdateSubCategoryDto, 'body'), this.subCategoryController.updateSubCategory);

    this.router.get(this.path + '/get-all-subCategories/:categoryId', authMiddleware, this.subCategoryController.getallSubCategoriesByCategoryId);

    this.router.get(this.path + '/get-all-subCategories-name/:categoryId', authMiddleware, this.subCategoryController.getallSubCategoriesNameByCategoryId);

  }
}

export default SubCategoryRoute;
