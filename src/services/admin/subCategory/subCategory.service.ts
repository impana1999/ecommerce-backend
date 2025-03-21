import { HttpException } from '@exceptions/HttpException';
import { SubCategoryModel } from '@models/index';

//Author : Srinivas
//Creates new subCategory and stores into "subCategories" collection.
export default class SubCategoryService {
  private subCategoryModel = SubCategoryModel;

  public async createSubCategory(subCategoryInput: { 
    name: string; 
    imageUrl: string; 
    isActive: boolean;
    categoryIds : [];
 
 }) {
    try {
      const { name, imageUrl, isActive,categoryIds } = subCategoryInput;

      const newSubCategory = await (
        await this.subCategoryModel.create({
          name,
          imageUrl,
          isActive,
          categoryIds
        })
      ).save();
      const response = {
        newSubCategory,
      };
      return response
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get all subCategories
  public async getAllSubCategories() {
    try {
      const allSubCategories = await this.subCategoryModel.find();

      if (!allSubCategories) {
        throw new HttpException(400, 'No SubCategory found');
      }
      return allSubCategories;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  all subCategories by name,id
  public async getAllSubCategoriesShort() {
    try {
      const subCategory = await this.subCategoryModel.find({}, '_id name');
      if (!subCategory) {
        throw new HttpException(400, 'No SubCategory found');
      }
      return subCategory;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  Single subCategory by Id
  public async getSingleSubCategoryById(subCategoryId: string) {
    try {
      const subCategory = await this.subCategoryModel.findOne({ _id: subCategoryId});
      if (!subCategory) {
        throw new HttpException(404, 'SubCategory not found');
      }
      return subCategory;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Remove subCategory by Id
  public async RemoveSubCategoryById(subCategoryId: string) {
    try {
      const subCategory = await this.subCategoryModel.findById(subCategoryId);
      if (!subCategory) {
        throw new HttpException(404, 'SubCategory not found');
      }
      await this.subCategoryModel.findByIdAndRemove(subCategoryId);
      const response = {
        message: 'subCategory data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Updated the subCategory  by using subCategoryId
  public async updateSubCategoryById(subCategoryId: string, updatedSubCategoryData: any) {
    try {
      const subCategory = await this.subCategoryModel.findById(subCategoryId);

      if (!subCategory) {
        throw new HttpException(400, 'subCategory not found');
      } else {
        if (updatedSubCategoryData.name) {
          subCategory.name = updatedSubCategoryData.name;
        }
        if (updatedSubCategoryData.imageUrl) {
          subCategory.imageUrl = updatedSubCategoryData.imageUrl;
        }
        if (updatedSubCategoryData.isActive) {
          subCategory.isActive = updatedSubCategoryData.isActive;
        }
        if (updatedSubCategoryData.categoryIds) {
            subCategory.categoryIds = updatedSubCategoryData.categoryIds;
          }
        
        const updatedSubCategory = await subCategory.save();
        return updatedSubCategory;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // author Vishal
  public async getAllSubCategoryByCategoryId(categoryId: string){

      try {
        const allSubCategories = await this.subCategoryModel.find({ categoryIds: categoryId });
        if (!allSubCategories) {
          throw new HttpException(404, 'SubCategory not found');
        }
        return allSubCategories;
      } catch (err) {
        throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
      }
    
  }

  public async getAllSubCategoryNameByCategoryId(categoryId: string) {
    try {
      const allsSubCategoryWithName = await this.subCategoryModel.find({categoryIds:categoryId}, '_id name');
      if (!allsSubCategoryWithName) {
        throw new HttpException(400, 'No SubCategory found');
      }
      return allsSubCategoryWithName;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


}
