//import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { BannerSchemaModel } from '@models/index';
const useTwilioCountry = ['1'];
import bcrypt, { hash } from 'bcryptjs';
import schedule from 'node-schedule';

export default class BannerAuthService {
  private bannerSchemaModel = BannerSchemaModel;
  // create a new banner
  public async createBanner(bannerInput: {
    title : string,
    text: string,
    subText: string,
    imageUrl : string,
    description : string,
    expiryDate : number,
    active : boolean,
    status : string//(enum)
  }) {
    try {
      const { title,text,subText, imageUrl,description,expiryDate,active, status} =
      bannerInput;

      const newEvent = await (
        await this.bannerSchemaModel.create({
            title,text,subText, imageUrl,description,expiryDate,active, status
        })
      ).save();
      schedule.scheduleJob(new Date(expiryDate), async () => {
        try {
          await this.bannerSchemaModel.findByIdAndDelete(newEvent._id);
          console.log(`Banner ${newEvent._id} deleted at expiry date.`);
        } catch (err) {
          console.error('Error deleting banner:', err);
        }
      });
      const response = {
        newEvent,
      };

      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // get all banner details
  public async getAllBanners() {
    try {
      const banners = await this.bannerSchemaModel.find();
      return banners;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // get single banner details
  public async getBannerById(bannerId: string) {
    try {
      const banner = await this.bannerSchemaModel.findById(bannerId);
        console.log(banner)
      if (!banner) {
        throw new HttpException(404, 'banner not found');
      }
      return banner;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // update the banner
  public async updateBannerById(bannerId: string, updatedBannerData: any) {
    try {
      const banner = await this.bannerSchemaModel.findById(bannerId);

      if (!banner) {
        throw new HttpException(400, 'banner not found');
      } else {
        if (updatedBannerData.title) {
            banner.title = updatedBannerData.title;
        }
        if (updatedBannerData.text) {
            banner.text = updatedBannerData.text;
        }
        if (updatedBannerData.subText) {
            banner.subText = updatedBannerData.subText;
        }
        if (updatedBannerData.title) {
            banner.title = updatedBannerData.title;
        }
        if (updatedBannerData.imageUrl) {
            banner.imageUrl = updatedBannerData.imageUrl;
        }
        if (updatedBannerData.description) {
            banner.description = updatedBannerData.description;
        }
        if (updatedBannerData.expiryDate) {
            banner.expiryDate = updatedBannerData.expiryDate;
        }
        if (updatedBannerData.active) {
            banner.active = updatedBannerData.active;
        }
        if (updatedBannerData.status) {
            banner.status = updatedBannerData.status;
        }
        const updatedBanner = await banner.save();
        return updatedBanner;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // remove the banner
  public async removeBannerById(bannerId: string) {
    try {
      const banner = await this.bannerSchemaModel.findById(bannerId);

      if (!banner) {
        throw new HttpException(404, 'banner not found');
      }
      await this.bannerSchemaModel.findByIdAndRemove(bannerId);
      const response = {
        message: 'banner data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
