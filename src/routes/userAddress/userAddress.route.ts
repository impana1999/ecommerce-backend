import { Router } from 'express';
import { AddAddressController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

import {AddressUpdateDto,CreateAddressDto} from '@dtos/index';


class AddAddressRoute implements Routes {
  public path = '/User';
  public router = Router();
  public AddAddressController = new AddAddressController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/add-Address',
     validationMiddleware(CreateAddressDto,'body'),
     authMiddleware,
    this.AddAddressController.AddressCreater)

    this.router.get(this.path + '/get-all-address/:userId', 
    authMiddleware,
    this.AddAddressController.getalladdress)

    this.router.get(this.path + '/get-all-address-short',
    authMiddleware, 
    this.AddAddressController.getalladdressShort)

    this.router.get(this.path + '/get-Address/:id',
    authMiddleware,
    this.AddAddressController.fetchaddress);
    
    this.router.post(this.path + '/update-Address/:addressId',
      validationMiddleware(AddressUpdateDto, 'body'),
      authMiddleware,
      this.AddAddressController.updataddressbyid,
    );

    this.router.delete(this.path + '/delete-Address/:addressId',
      authMiddleware,
      this.AddAddressController.removeaddressbyId,
    );
  }
 
}
export default AddAddressRoute;
