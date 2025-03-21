// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { sendSMSWithSNS } from '@/lib/aws-sns-sms';
import { sendSMSWithTwilio } from '@/lib/twilio';
import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from '@globals/jwt.global';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import { LocationSchemaModel } from '@models/index';
import { LocationStatus } from '@/interfaces';
const useTwilioCountry = ['1'];



export default class AdminLocationService {


  private locationSchemaModel = LocationSchemaModel;
  private DEFAULT_LOCATION = { lat: "", lng: "" };

  // Author : Vishal
  // Creates new location and stores into "locations" collection.
  public async createLocation(locationInput: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: {
      lat: number;
      long: number;
    };
    imageUrl: string;
    branchCode?: string;
    branchManager?: {
      // optional
      id: string;
      name: string;
      email: string;
      profilePicUrl: string;
      role: string;
    };
    status: string;
    isActive: boolean;
  }) {
    try {

      locationInput.status = LocationStatus.ACTIVE;
      locationInput.isActive = true;

      const location = await (await this.locationSchemaModel.create(locationInput)).save();

      return {location};

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Author : Srinivas
  // Updated the location  by using locationId
  public async updateLocationById(locationId: string, updatedLocationtData: any) {
    try {
      const location = await this.locationSchemaModel.findById(locationId);

      if (!location) {
        throw new HttpException(400, 'location not found');
      } else {
        if (updatedLocationtData.name) {
          location.name = updatedLocationtData.name;
        }
        if (updatedLocationtData.address) {
          location.address = updatedLocationtData.address;
        }
        if (updatedLocationtData.city) {
          location.city = updatedLocationtData.city;
        }
        if (updatedLocationtData.state) {
          location.state = updatedLocationtData.state;
        }
        if (updatedLocationtData.country) {
          location.country = updatedLocationtData.country;
        }
        if (updatedLocationtData.zipCode) {
          location.zipCode = updatedLocationtData.zipCode;
        }
        if (updatedLocationtData.coordinates) {
          location.coordinates = updatedLocationtData.coordinates;
          if (updatedLocationtData.imageUrl) {
            location.imageUrl = updatedLocationtData.imageUrl;
          }
          if (updatedLocationtData.branchCode) {
            location.branchCode = updatedLocationtData.branchCode;
          }
          if (updatedLocationtData.branchManager) {
            location.branchManager = updatedLocationtData.branchManager;
          }
        }
        if (updatedLocationtData.status) {
          location.status = updatedLocationtData.status;
        }
        if (updatedLocationtData.isActive) {
          location.isActive = updatedLocationtData.isActive;
        }
        if (updatedLocationtData.services) {
          location.services = updatedLocationtData.services;
        }

        const updatedLocation = await location.save();
        return updatedLocation;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Author : Gaurav
  // 
  public async adminGetAllLocation() {
    try {
      const AllLocation = await this.locationSchemaModel.find();
      

      if (!AllLocation) {
        throw new HttpException(400, 'No location found');
      }
      return AllLocation
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }
  }

  public async adminGetAllShort() {
    try {
      const locations = await this.locationSchemaModel.find({}, '_id name imageUrl branchManager services');
      // console.log(AllLocation)
      if (!locations) {
        throw new HttpException(400, 'No location found');
      }
      // const {id,name,imageUrl,manager}=AllLocation;
      return locations
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }
  }


  // try {
  //     const location = await this.locationModel.findById(locationId);

  //     if (!location) {
  //         throw new HttpException(400, 'Location not found');
  //     }

  //     for (const key in updatedLocationtData) {
  //         switch (key) {
  //             case 'name':
  //             case 'address':
  //             case 'city':
  //             case 'state':
  //             case 'country':
  //             case 'zipCode':
  //             case 'coordinates':
  //             case 'imageUrl':
  //             case 'branchCode':
  //             case 'branchManager':
  //             case 'status':
  //             case 'isActive':
  //             case "services" :

  //                 location[key] = updatedLocationData[key];
  //                 break;

  //         }
  //     }

  //     const updatedLocation = await location.save();
  //     return updatedLocation;
  // } catch (err) {
  //     throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  // }
  //}


  // Fetch loaction By Id 
  public async fetchLocationById(
    locationId: string) {
    try {
      const location = await this.locationSchemaModel.findOne({ _id: locationId});
      if (!location) {
        throw new HttpException(404, 'Location not found');
      }
      return location;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // Delete location By Id
  public async deleteLocationById(locationId: string) {
    console.log(locationId)
    try {
      const location = await this.locationSchemaModel.findById(locationId);
      console.log(location)
      if (!location) {
        throw new HttpException(404, 'Location not found');
      }
      await this.locationSchemaModel.findByIdAndRemove(locationId);
      const response = {
        message: 'Location data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


}


