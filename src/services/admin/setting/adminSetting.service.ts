import { HttpException } from '@exceptions/HttpException';
import { AdminSettingModel} from '@models/index';

//Author : Srinivas
//Creates new category and stores into "categories" collection.
export default class AdminSettingServices {
  private AdminSettingModel = AdminSettingModel;

  public async createsetting(explorecozmoInput: { 
    type: string; 
    description: string; 
 
 }) {
    try {
      const { type, description } = explorecozmoInput;

      const setting = await (
        await this.AdminSettingModel.create({
          type,
          description
        })
      ).save();
      const response = {
        setting,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
   
  //Get all categories
  public async getAboutUsSetting() {
    try {
      const AboutUs = await this.AdminSettingModel.find({type:"ABOUTUS"});

      if (!AboutUs) {
        throw new HttpException(400, 'No setting found');
      }
      return AboutUs;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  all categories by name,id
  public async Privacypolicy() {
    try {
      const Privacypolicy = await this.AdminSettingModel.find({type:"PRIVACYPOLICY"});
      if (!Privacypolicy) {
        throw new HttpException(400, 'No Privacypolicy found');
      }
      return Privacypolicy;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  Single category by Id 
  public async termsandCondition() {
    try {
      const termsandCondition = await this.AdminSettingModel.find({type:"TERMSANDCONDITION"});
      if (!termsandCondition) {
        throw new HttpException(400, 'No termsandCondition found');
      }
      return termsandCondition;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Remove category by Id
  public async deletesetting(Id: string) {
    try {
      const explorecozmo = await this.AdminSettingModel.findById(Id);
      if (!explorecozmo) {
        throw new HttpException(404, 'explorecozmo not found');
      }
      await this.AdminSettingModel.findByIdAndRemove(Id);
      const response = {
        message: 'Setting data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Updated the category  by using categoryId
  public async updatesetting(id: string, updatedData: any) {
    try {
      const setting = await this.AdminSettingModel.findById(id);

      if (!setting) {
        throw new HttpException(400, 'setting not found');
      } else {
        if (updatedData.type) {
          setting.type = updatedData.type;
        }
        if (updatedData.description) {
          setting.description = updatedData.description;
        }
        
        const updatedSetting = await setting.save();
        return updatedSetting;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

}
