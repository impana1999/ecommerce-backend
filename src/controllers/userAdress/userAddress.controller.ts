import { Request, Response } from 'express';
import { AddAddressService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class AddAddressController
{
  private AddAddressService = new AddAddressService();

 

  public getalladdress = catchAsync(async( req: Request, res : Response) : Promise<void> => {
    const userId=req.params.userId
    const allLocation = await this.AddAddressService.getAllAddress(userId)
    ApiResponse.successResponseWithData(res, "Get all Address sucessfully", allLocation)
  })

  public getalladdressShort = catchAsync(async( req: Request, res : Response) : Promise<void> => {
    const data = await this.AddAddressService.getAllAddressShort()
    ApiResponse.successResponseWithData(res, "Get all Address fetched sucessfully", data)
  })
 
  public AddressCreater = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const locationData = await this.AddAddressService.CreateAddress(req.body);
    ApiResponse.successResponseWithData(res, 'Create Address Successfully', locationData );
  });

  public fetchaddress= catchAsync(async (req: Request, res: Response): Promise<void> => {
    const addressId = req.params.id;
    const fetchLocationData = await this.AddAddressService.fetchAddress(addressId);
    ApiResponse.successResponseWithData(res, 'Address fetched Successfully', fetchLocationData );
  });


  public removeaddressbyId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const addressId = req.params.addressId;
      await this.AddAddressService.removeAddressById(addressId);
      ApiResponse.successResponse(res, 'Address Removed Successfully');
    } catch (err) {

      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }

  });

  public updataddressbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const addressId = req.params.addressId;
      const data = await this.AddAddressService.updatAddressByid(addressId, req.body);
      ApiResponse.successResponseWithData(res, 'Successfully updated Address', data);

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });


}
