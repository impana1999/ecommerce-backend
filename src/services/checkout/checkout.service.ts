// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { CheckoutModel } from '@models/index';

export default class CheckOutService {
  private CheckoutModel = CheckoutModel;

  //Author : Impana
  //Creates new product item added to the cart
  public async ProceedCheckout(checkoutInput: {
    userId: string;
    productDetails: {
      id: string;
      name: string;
      imageUrl: string;
      specifications: [
        {
          feature: [{
            type:[],
            name:string,
            unit: string
        }];
          selected: string;
          unit: string;
        }
      ];
      price: number;
      quantity:number;
      availability:number;
    }[];
    quantity: number;
    status: string;
    pickuplocation: {
      branchId: string;
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      imageUrl: string;
      zipCode: string;
    };
    diliverLocation: {
      AddressId: string;
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      imageUrl: string;
      zipCode: string;
    };
    totalAmount: number;
  }) {
    try {
      const {
        userId,
        productDetails,
        quantity,
        status,
        pickuplocation,
        diliverLocation,
        totalAmount
      } = checkoutInput;
  
      const newCheckout = await this.CheckoutModel.create({
        userId,
        productDetails, // Make sure productDetails is an array
        quantity,
        status,
        pickuplocation,
        diliverLocation,
        totalAmount
      });
  
      const response = {
        newCheckout
      };
  
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async removeItmeById(Id: string) {
    try {
      const cartItem = await this.CheckoutModel.findOneAndDelete({ _id: Id });
      if (!cartItem) {
        throw new HttpException(400, 'ID not Exist');
      }
      await this.CheckoutModel.findByIdAndRemove(Id);
      const response = {
        message: 'Checkout data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  public async fetchUserCheckout(userid:string) {
    try {

      const Items = await this.CheckoutModel.findOne({_id:userid});
      if (!Items) {
        console.log(`No Items found }`);
        throw new HttpException(404, 'No Items found');
      }
      return Items;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async beforeCheckout(checkoutInput: {
    userId: string;
    productDetails: {
      id: string;
      name: string;
      imageUrl: string;
      specifications: [
        {
          feature: [{
            type:[],
            name:string,
            unit: string
        }];
          selected: string;
          unit: string;
        }
      ];
      price: number;
    }[];
    
  }) {
    try {
      const {
        userId,
        productDetails,
       
      } = checkoutInput;
  
      const newCheckout = await this.CheckoutModel.create({
        userId,
        productDetails,
        beforeCheckout:true // Make sure productDetails is an array
      });
  
      const response = {
        newCheckout
      };
  
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async getbeforecheckout(userid:string) {
    try {
      const Items = await this.CheckoutModel.findOne({userId:userid,beforeCheckout:true});
      if (!Items) {
        console.log(`No Items found }`);
        throw new HttpException(404, 'No Items found');
      }
      return Items;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
}
