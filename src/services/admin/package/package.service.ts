import { PackageStatus } from '@/interfaces';
import { HttpException } from '@exceptions/HttpException';
import { PackageModel } from '@models/index';

//Author : Srinivas
//Creates new package and stores into "packages" collection.
export default class PackageService {

  
  private packageModel = PackageModel;


  public async createPackage(packageInput) {
    try {

      packageInput.status = PackageStatus.ACTIVE;
      packageInput.isActive = true;
      const newPackage = await (await this.packageModel.create(packageInput)).save();

      return { newPackage };
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  //Get all packages
  public async getAllPackages() {
    try {
      const packages = await this.packageModel.find();

      if (!packages) {
        throw new HttpException(400, 'No product found');
      }
      return packages;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  //Get  all packages by title,id
  public async getAllPackagesShort() {
    try {
      const data = await this.packageModel.find({}, '_id title');
      if (!data) {
        throw new HttpException(400, 'No package found');
      }
      return data;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  //Get  Single package by Id
  public async getSinglePackageById(packageId: string) {
    try {
      const data = await this.packageModel.findOne({ _id: packageId });
      if (!data) {
        throw new HttpException(404, 'Package not found');
      }
      return data;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  //Get Packages by event type
  public async getPackagesByEventType(eventType: string) {
    try {
      const packages = await this.packageModel.find({ eventType });
      if (!packages) {
        throw new HttpException(404, 'Packages not found');
      }
      return { packages };
    } catch (err) {
      console.log('Error packages by event type', err);
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  //Remove package by Id
  public async removePackageById(packageId: string) {
    try {
      const data = await this.packageModel.findById(packageId);
      if (!data) {
        throw new HttpException(404, 'Package not found');
      }
      await this.packageModel.findByIdAndRemove(packageId);
      const response = {
        message: 'Package data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  
  // Updated the package  by using packageId
  public async updatePackageById(packageId: string, updatedPackageData: any) {
    try {
      const data = await this.packageModel.findById(packageId);

      if (!data) {
        throw new HttpException(400, 'data not found');
      } else {
        if (updatedPackageData.title) {
          data.title = updatedPackageData.title;
        }
        if (updatedPackageData.subTitle) {
          data.subTitle = updatedPackageData.subTitle;
        }
        if (updatedPackageData.activities) {
          data.activities = updatedPackageData.activities;
        }
        if (updatedPackageData.activityDetails) {
          data.activityDetails = updatedPackageData.activityDetails;
        }
        if (updatedPackageData.description) {
          data.description = updatedPackageData.description;
        }
        if (updatedPackageData.addOns) {
          data.addOns = updatedPackageData.addOns;
        }
        if (updatedPackageData.isActive) {
          data.isActive = updatedPackageData.isActive;
        }
        if (updatedPackageData.peopleIncluded) {
          data.peopleIncluded = updatedPackageData.peopleIncluded;
        }
        if (updatedPackageData.amount) {
          data.amount = updatedPackageData.amount;
        }
        if (updatedPackageData.locations) {
          data.locations = updatedPackageData.locations;
        }
        if (updatedPackageData.duration) {
          data.duration = updatedPackageData.duration;
        }
        if (updatedPackageData.features) {
          data.features = updatedPackageData.features;
        }
        
        const updatedPackage = await data.save();
        return updatedPackage;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


}
