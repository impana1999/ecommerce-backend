import { HttpException } from '@exceptions/HttpException';
import { CozmoServiceModel} from '@models/index';

//Author : Srinivas
//Creates new category and stores into "categories" collection.
export default class CozmoServiceServices {
  private CozmoServiceModel = CozmoServiceModel;

  public async CozmoServiceCreate(cozmoserviceInput: { 
    title: string; 
    imageUrl: string; 
    description: string; 
 
 }) {
    try {
      const { title, imageUrl, description } = cozmoserviceInput;

      const newCozmoService = await (
        await this.CozmoServiceModel.create({
          title,
          imageUrl,
          description
        })
      ).save();
      const response = {
        newCozmoService,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get all categories
  public async getallCozmoService() {
    try {
      const allcozmoservices = await this.CozmoServiceModel.find();

      if (!allcozmoservices) {
        throw new HttpException(400, 'No cozmoservice found');
      }
      return allcozmoservices;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  all categories by name,id
  public async getallCozmoServiceShort() {
    try {
      const cozmoservice = await this.CozmoServiceModel.find({}, '_id name');
      if (!cozmoservice) {
        throw new HttpException(400, 'No cozmoservice found');
      }
      return cozmoservice;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  Single category by Id 
  public async getSingleCozmoServiceById(cozmoserviceId: string) {
    try {
      const category = await this.CozmoServiceModel.findOne({ _id: cozmoserviceId});
      if (!category) {
        throw new HttpException(404, 'Cozmoservice not found');
      }
      return category;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Remove category by Id
  public async removeCozmoServicebyId(cozmoserviceId: string) {
    try {
      const category = await this.CozmoServiceModel.findById(cozmoserviceId);
      if (!category) {
        throw new HttpException(404, 'Cozmoservice not found');
      }
      await this.CozmoServiceModel.findByIdAndRemove(cozmoserviceId);
      const response = {
        message: 'Cozmoservice data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Updated the category  by using categoryId
  public async updateCozmoService(cozmoserviceId: string, updatedcozmoserviceData: any) {
    try {
      const cozmoservice = await this.CozmoServiceModel.findById(cozmoserviceId);

      if (!cozmoservice) {
        throw new HttpException(400, 'Cozmoservice not found');
      } else {
        if (updatedcozmoserviceData.title) {
          cozmoservice.title = updatedcozmoserviceData.title;
        }
        if (updatedcozmoserviceData.imageUrl) {
          cozmoservice.imageUrl = updatedcozmoserviceData.imageUrl;
        }
        if (updatedcozmoserviceData.description) {
          cozmoservice.description = updatedcozmoserviceData.description;
        }
        
        const updatedCategory = await cozmoservice.save();
        return updatedCategory;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

}
