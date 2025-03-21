// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { CartModel, wishlistModel } from '@models/index';

export default class CartService {
  private cartModel = CartModel;
  private wishlistModel= wishlistModel;

  //Author : Impana
  //Creates new product item added to the cart
  public async addToCart(cartInput: {
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
    };
    status: string;
    

  }) {
    try {
      const {
        userId,
        productDetails,
        status
      } = cartInput;
      const existingCartItem = await this.cartModel.findOne({userId:userId,"productDetails.id": productDetails.id});

      if (existingCartItem) {
       const newCartItem=await this.cartModel.findOneAndUpdate(
          {userId:userId,"productDetails.id": productDetails.id},
          { $inc: { quantity: 1 } }
        );
  
        const response = {
          message: 'Cart quantity updated successfully',
          newCartItem
        };
        return response;
      }
     const wishlistItem= await this.wishlistModel.findOne({"productDetails.id":productDetails.id})
     await this.wishlistModel.findOneAndUpdate({"productDetails.id":productDetails.id},{isinCart:true})
      const isWishlist = wishlistItem ? true : false;
      const newCartItem = await (
        await this.cartModel.create({
          userId,
          productDetails,
          status,
          iswishlist:isWishlist
        })
      ).save();
      const response = {
        newCartItem,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Author : Srinivas
  //Remove item from cart
  public async removeItmeById(cartId: string) {
    try {
      const cartItem = await this.cartModel.findOneAndDelete({ _id: cartId });
      if (!cartItem) {
        throw new HttpException(400, 'ID not Exist');
      }
      await this.cartModel.findByIdAndRemove(cartId);
      await this.wishlistModel.findOneAndUpdate({"productDetails.id":cartItem.productDetails.id},{$set:{isinCart:false}})
      const response = {
        message: 'cartItem  data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }


  // author Vishal
  // Fetch user cart from db
  public async fetchUserCartFromUserId(userId: string) {
    try {

      const cartItems = await this.cartModel.find({ userId });
      if (!cartItems || cartItems.length === 0) {
        console.log(`No cartItems found for user with ID: ${userId}`);
        throw new HttpException(404, 'No cartItems found');
      }
      return cartItems;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Update quantity of item in the cart
  public async updateQuantity(cartId: string, updatedData: any) {
    try {
      const cartItem = await this.cartModel.findById(cartId);

      if (!cartItem) {
        throw new HttpException(404, 'cartItem not found');
      } else {
        if (updatedData.quantity) {
          cartItem.productDetails.quantity = updatedData.quantity;
        }

        const updatedCart = await cartItem.save();
        return updatedCart;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
