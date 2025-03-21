import {wishlistStatus,ProductDetails1} from "@interfaces/index"
//Author : Srinivas
export default class wishlistSchema {
  private _userId: string;
  private _productDetails: ProductDetails1;
  private _status: string;
  private _isinCart: boolean;
  
  constructor({
    userId = '',
    productDetails = {id: "" , name: "", imageUrl: "", price: 0,quantity : 0,},
    status = wishlistStatus.ACTIVE,
    isinCart= false
  

  }) {

    this._userId = userId;
    this._productDetails = productDetails;
    this._status = status;
    this._isinCart =isinCart;

  }


  setUserId(value: string): void {
    this._userId = value || null;
  }

  setProductDetails(value: ProductDetails1): void {
    this._productDetails = value;
  }

  setStatus(value: string): void {
    this._status = value || null;
  }
  setiswishlist(value: boolean): void {
    this._isinCart = value || null;
  }

  
  getUserId = (): string | null => this._userId;
  getiswishlist = (): boolean | null => this._isinCart;


  getProductDetails = (): object | null => this._productDetails;

  getStatus = (): string | null => this._status;


  getEntityMappings() {
    return {
      userId: this.getUserId(),
      productDetails: this.getProductDetails(),
      status: this.getStatus(),
      isinCart: this.getiswishlist(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    };
  }
}
