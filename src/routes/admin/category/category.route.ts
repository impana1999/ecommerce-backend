import { Router } from 'express';
import { CategoryController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { CategoryDto,UpdateCategoryDto } from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class CategoryRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-category', validationMiddleware(CategoryDto, 'body'), authMiddleware, this.categoryController.categoryCreate);

    this.router.get(this.path + '/get-all-categories', authMiddleware, this.categoryController.getallCategories);

    this.router.get(this.path + '/get-all-categories-short', authMiddleware, this.categoryController.getallCategoriesShort);

    this.router.get(this.path + '/get-category/:categoryId', authMiddleware, this.categoryController.getSingleCategoryById);

    this.router.delete(this.path + '/delete-category/:categoryId', authMiddleware, this.categoryController.removeCategorybyId);

    this.router.post(this.path + '/update-category/:categoryId', validationMiddleware(UpdateCategoryDto, 'body'), this.categoryController.updateCategory);
  }
}

export default CategoryRoute;
