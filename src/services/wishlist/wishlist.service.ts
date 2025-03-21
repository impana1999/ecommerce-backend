// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { wishlistModel ,CartModel} from '@models/index';

export default class WishlistService {
  private wishlistModel = wishlistModel;
  private CartModel=CartModel;

  //Author : Impana
  //Creates new product item added to the cart
  public async addToWishlist(listInput: {
    userId: string;
    productDetails: {
      id: string;
      name: string;
      imageUrl: string;
      price: number;
      quantity: number;
    };
    
    status: string;
    isinCart: boolean;
  }) {
    try {
      const {
        userId,
        productDetails,
        status
      } = listInput;
      const existingWishlistItem = await this.wishlistModel.findOne({"productDetails.id":productDetails.id,userId:userId});

      if (existingWishlistItem) {
        throw new HttpException(400, 'Product already exists in the wishlist');
      }
      const addedtocart= await this.CartModel.findOne({"productDetails.id":productDetails.id})
       await this.CartModel.findOneAndUpdate({"productDetails.id":productDetails.id},{iswishlist:true})
      const isinCart = addedtocart ? true : false;
      const newListItem = await (
        await this.wishlistModel.create({
          userId,
          productDetails,
          status,
          isinCart:isinCart
        })
      ).save();
      const response = {
        newListItem,
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Author : Impana
  //Remove item from cart
  public async removeList(listId: string) {
    try {
      const cartItem = await this.wishlistModel.findOneAndDelete({ _id: listId });
      if (!cartItem) {
        throw new HttpException(400, 'ID not Exist');
      }
      await this.wishlistModel.findByIdAndRemove(listId);
      await this.CartModel.findOneAndUpdate({"productDetails.id":cartItem.productDetails.id},{$set:{iswishlist:false}})
      const response = {
        message: 'whishlist  data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async fetchUserWishlistById(userId: string) {
    try {

      const cartItems = await this.wishlistModel.find({ userId });
      if (!cartItems || cartItems.length === 0) {
        console.log(`No wishlist found for user with ID: ${userId}`);
        throw new HttpException(404, 'No wishlist found');
      }
      return cartItems;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
