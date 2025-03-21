//import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { ServiceSchemaModel } from '@models/index';
const useTwilioCountry = ['1'];
import bcrypt, { hash } from 'bcryptjs';

export default class ServicesAuthService {
  private serviceSchemaModel = ServiceSchemaModel;
  // create a new service 
  public async serviceCreate(serviceInput: {
  
    name: string;
    imageUrl: string;
    type : string;
    details? : [
      {
        label : string,
        imageUrl : string,
        description : string,
        amount: string,
        mealType: string
      }
    ]
  
   
  }) { 
    try {
      const {name, imageUrl, type, details } =
      serviceInput;

      const newService = await (
        await this.serviceSchemaModel.create({
          name, imageUrl, type, details
        })
      ).save();
      const response = {
        newService,
      };

      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // Get All  Services
  public async getAllServices() {
    try {
      const services = await this.serviceSchemaModel.find();
      return services;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // get single service details
  public async getServiceById(serviceId: string) {
    try {
      const service = await this.serviceSchemaModel.findById(serviceId);

      if (!service) {
        throw new HttpException(404, 'Service not found');
      }
      return service;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // update the service
  public async updateServiceById(serviceId: string, updatedServiceData: any) {
    try {
      const service = await this.serviceSchemaModel.findById(serviceId);

      if (!service) {
        throw new HttpException(400, 'Service not found');
      } else {
        if (updatedServiceData.name) {
          service.name = updatedServiceData.name;
        }
        if (updatedServiceData.imageUrl) {
          service.imageUrl = updatedServiceData.imageUrl;
        }
        if (updatedServiceData.type) {
          service.type = updatedServiceData.type;
        }
        if (updatedServiceData.details) {
          service.details = updatedServiceData.details;
        }
        const updatedService = await service.save();
        return updatedService;
      }
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Something went wrong'
      );
    }
  }
  // remove the service
  public async removeServiceById(serviceId: string) {
    try {
      const service = await this.serviceSchemaModel.findById(serviceId);

      if (!service) {
        throw new HttpException(404, 'Service not found');
      }
      await this.serviceSchemaModel.findByIdAndRemove(serviceId);
      const response = {
        message: 'Service data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
