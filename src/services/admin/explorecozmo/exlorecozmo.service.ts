import { HttpException } from '@exceptions/HttpException';
import { ExploreCozmoModel} from '@models/index';

//Author : Srinivas
//Creates new category and stores into "categories" collection.
export default class ExploreCozmoServices {
  private ExploreCozmoModel = ExploreCozmoModel;

  public async explorecreate(explorecozmoInput: { 
    title: string; 
    imageUrl: string; 
 
 }) {
    try {
      const { title, imageUrl } = explorecozmoInput;

      const newexploreCozmo = await (
        await this.ExploreCozmoModel.create({
          title,
          imageUrl
        })
      ).save();
      const response = {
        newexploreCozmo,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
   
  //Get all categories
  public async getallexplorecozmo() {
    try {
      const allexplorecozmo = await this.ExploreCozmoModel.find();

      if (!allexplorecozmo) {
        throw new HttpException(400, 'No explorecozmo found');
      }
      return allexplorecozmo;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  all categories by name,id
  public async getallexploreCozmoShort() {
    try {
      const explorecozmo = await this.ExploreCozmoModel.find({}, '_id name');
      if (!explorecozmo) {
        throw new HttpException(400, 'No explorecozmo found');
      }
      return explorecozmo;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  Single category by Id 
  public async getSingleexploreCozmoById(explorecozmoId: string) {
    try {
      const category = await this.ExploreCozmoModel.findOne({ _id: explorecozmoId});
      if (!category) {
        throw new HttpException(404, 'explorecozmo not found');
      }
      return category;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Remove category by Id
  public async removeexplorecozmobyId(explorecozmoId: string) {
    try {
      const explorecozmo = await this.ExploreCozmoModel.findById(explorecozmoId);
      if (!explorecozmo) {
        throw new HttpException(404, 'explorecozmo not found');
      }
      await this.ExploreCozmoModel.findByIdAndRemove(explorecozmoId);
      const response = {
        message: 'explorecozmo data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Updated the category  by using categoryId
  public async updateexplorecozmo(explorecozmoId: string, updatedcozmoserviceData: any) {
    try {
      const explorecozmo = await this.ExploreCozmoModel.findById(explorecozmoId);

      if (!explorecozmo) {
        throw new HttpException(400, 'explorecozmo not found');
      } else {
        if (updatedcozmoserviceData.title) {
          explorecozmo.title = updatedcozmoserviceData.title;
        }
        if (updatedcozmoserviceData.imageUrl) {
          explorecozmo.imageUrl = updatedcozmoserviceData.imageUrl;
        }
        
        const updatedCategory = await explorecozmo.save();
        return updatedCategory;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

}
