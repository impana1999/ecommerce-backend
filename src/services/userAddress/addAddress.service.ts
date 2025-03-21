// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { sendSMSWithSNS } from '@/lib/aws-sns-sms';
import { sendSMSWithTwilio } from '@/lib/twilio';
import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from '@globals/jwt.global';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import { AddressModel } from '@models/index';
import { AddressStatus } from '@/interfaces';
const useTwilioCountry = ['1'];



export default class AddAddressService {


  private AddressModel = AddressModel;
  private DEFAULT_LOCATION = { lat: "", lng: "" };

  // Author : Vishal
  // Creates new location and stores into "locations" collection.
  public async CreateAddress(addressInput: {
    userId:string;
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
    status: string;
  }) {
    try {

      addressInput.status = AddressStatus.ACTIVE;

      const location = await (await this.AddressModel.create(addressInput)).save();

      return {location};

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Author : Srinivas
  // Updated the location  by using locationId
  // public async updatAddressByid(addressId: string, updatedAddresstData: any) {
  //   try {
  //     const address = await this.AddressModel.findById(addressId);

  //     if (!address) {
  //       throw new HttpException(400, 'location not found');
  //     } else {
  //       if (updatedAddresstData.name) {
  //         address.name = updatedAddresstData.name;
  //       }
  //       if (updatedAddresstData.address) {
  //         address.address = updatedAddresstData.address;
  //       }
  //       if (updatedAddresstData.city) {
  //         address.city = updatedAddresstData.city;
  //       }
  //       if (updatedAddresstData.state) {
  //         address.state = updatedAddresstData.state;
  //       }
  //       if (updatedAddresstData.country) {
  //         address.country = updatedAddresstData.country;
  //       }
  //       if (updatedAddresstData.zipCode) {
  //         address.zipCode = updatedAddresstData.zipCode;
  //       }
  //       if (updatedAddresstData.coordinates) {
  //         address.coordinates = updatedAddresstData.coordinates;
  //       if (updatedAddresstData.status) {
  //         address.status = updatedAddresstData.status;
  //       }

  //       const updatedLocation = await address.save();
  //       return updatedLocation;
  //     }
  //   }
  //  } catch (err) {
  //     throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  //   }
  // }
  public async updatAddressByid(addressId: string, updatedLocationtData: any) {
    try {
      const location = await this.AddressModel.findById(addressId);

      if (!location) {
        throw new HttpException(400, 'Address not found');
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
        }
        if (updatedLocationtData.status) {
          location.status = updatedLocationtData.status;
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
  public async getAllAddress(userId:string) {
    try {
      const AllAddress = await this.AddressModel.find({userId:userId});
      

      if (!AllAddress) {
        throw new HttpException(400, 'No Address found');
      }
      return AllAddress
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }
  }

  public async getAllAddressShort() {
    try {
      const Address = await this.AddressModel.find({}, '_id name services');
      // console.log(AllLocation)
      if (!Address) {
        throw new HttpException(400, 'No Address found');
      }
      // const {id,name,imageUrl,manager}=AllLocation;
      return Address
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
  public async fetchAddress(
    addressId: string) {
    try {
      const location = await this.AddressModel.findOne({ _id: addressId});
      if (!location) {
        throw new HttpException(404, 'Address not found');
      }
      return location;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // Delete location By Id
  public async removeAddressById(addressId: string) {
    console.log(addressId)
    try {
      const address = await this.AddressModel.findById(addressId);
      console.log(address)
      if (!address) {
        throw new HttpException(404, 'Address not found');
      }
      await this.AddressModel.findByIdAndRemove(addressId);
      const response = {
        message: 'Address data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


}


