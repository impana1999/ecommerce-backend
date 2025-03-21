import { HttpException } from '@exceptions/HttpException';
import { CategoryModel } from '@models/index';

//Author : Srinivas
//Creates new category and stores into "categories" collection.
export default class CategoryService {
  private categoryModel = CategoryModel;

  public async createCategory(categoryInput: { 
    name: string; 
    imageUrl: string; 
    isActive: boolean; 
 
 }) {
    try {
      const { name, imageUrl, isActive } = categoryInput;

      const newCategory = await (
        await this.categoryModel.create({
          name,
          imageUrl,
          isActive
        })
      ).save();
      const response = {
        newCategory,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get all categories
  public async getAllCategories() {
    try {
      const allCategories = await this.categoryModel.find();

      if (!allCategories) {
        throw new HttpException(400, 'No category found');
      }
      return allCategories;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  all categories by name,id
  public async getAllCategoriesShort() {
    try {
      const category = await this.categoryModel.find({}, '_id name');
      if (!category) {
        throw new HttpException(400, 'No category found');
      }
      return category;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  Single category by Id 
  public async getSingleCategoryById(categoryId: string) {
    try {
      const category = await this.categoryModel.findOne({ _id: categoryId });
      if (!category) {
        throw new HttpException(404, 'Category not found');
      }
      return category;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Remove category by Id
  public async RemoveCategoryById(categoryId: string) {
    try {
      const category = await this.categoryModel.findById(categoryId);
      if (!category) {
        throw new HttpException(404, 'category not found');
      }
      await this.categoryModel.findByIdAndRemove(categoryId);
      const response = {
        message: 'category data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Updated the category  by using categoryId
  public async updateCategoryById(categoryId: string, updatedCategoryData: any) {
    try {
      const category = await this.categoryModel.findById(categoryId);

      if (!category) {
        throw new HttpException(400, 'category not found');
      } else {
        if (updatedCategoryData.name) {
          category.name = updatedCategoryData.name;
        }
        if (updatedCategoryData.imageUrl) {
          category.imageUrl = updatedCategoryData.imageUrl;
        }
        if (updatedCategoryData.isActive) {
          category.isActive = updatedCategoryData.isActive;
        }
        
        const updatedCategory = await category.save();
        return updatedCategory;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

}
