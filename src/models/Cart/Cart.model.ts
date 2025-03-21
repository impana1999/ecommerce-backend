import {CartStatus,ProductDetails} from "@interfaces/index"

//Author : Srinivas
export default class CartModel {
  private _userId: string;
  private _productDetails: ProductDetails;
  private _status: string;
  private _iswishlist: boolean;
  
  constructor({
    userId = '',
    productDetails = {id: "" , name: "", imageUrl: "", price: 0, specifications: [{feature:[],selected: "", unit : ""}],quantity:0,availability:0},
    status = CartStatus.ACTIVE,
    iswishlist= false
  

  }) {

    this._userId = userId;
    this._productDetails = productDetails;
    this._status = status;
    this._iswishlist = iswishlist

  }


  setUserId(value: string): void {
    this._userId = value || null;
  }

  setProductDetails(value: ProductDetails): void {
    this._productDetails = value;
  }

  setStatus(value: string): void {
    this._status = value || null;
  }
  setiswishlist(value: boolean): void {
    this._iswishlist = value || null;
  }

  
  getUserId = (): string | null => this._userId;
  getiswishlist = (): boolean | null => this._iswishlist;


  getProductDetails = (): object | null => this._productDetails;

  getStatus = (): string | null => this._status;


  getEntityMappings() {
    return {
      userId: this.getUserId(),
      productDetails: this.getProductDetails(),
      status: this.getStatus(),
      iswishlist: this.getiswishlist(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    };
  }
}
