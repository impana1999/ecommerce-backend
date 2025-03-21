import {CheckoutStatus,CheckoutInterface,pickuplocation,diliverLocation, ProductDetails2} from "@interfaces/index"

//Author : Srinivas
export default class CartModel {
  private _userId: string;
  private _productDetails: ProductDetails2[];
  private _quantity: number;
  private _status: string;
  private _iswishlist: boolean;
  private _pickuplocation:pickuplocation;
  private _diliverLocation:diliverLocation;
  private _totalAmount:number
  private _beforeCheckout:boolean;
  constructor({
    userId = '',
    productDetails = [{id: "" , name: "", imageUrl: "", price: 0,specifications: [{feature:[],selected: "", unit : ""}],availability:0,quantity:0}],
    quantity = 0,
    status = CheckoutStatus.ACTIVE,
    pickuplocation={branchId:"",name:'',address:'',city:'',state:'',country:'',imageUrl:'',zipCode:''},
    diliverLocation={name:'',address:'',city:'',state:'',country:'',imageUrl:'',zipCode:'',AddressId:''},
    totalAmount=0,
    beforeCheckout=false
  }) {

    this._userId = userId;
    this._productDetails = productDetails;
    this._quantity = quantity;
    this._status = status;
    this._pickuplocation=pickuplocation
    this._diliverLocation=diliverLocation
    this._totalAmount=totalAmount
    this._beforeCheckout=beforeCheckout

  }

  
  setUserId(value: string): void {
    this._userId = value || null;
  }
  settotalAmount(value: number): void {
    this._totalAmount = value || null;
  }
  setProductDetails(value: ProductDetails2[]): void {
    this._productDetails = value;
  }

  setQuantity(value: number): void {
    this._quantity = value 
  }

  setStatus(value: string): void {
    this._status = value || null;
  }
  setispickuplocation(value: pickuplocation): void {
    this._pickuplocation = value || null;
  }
  setisdiliverLocation(value: diliverLocation): void {
    this._diliverLocation = value || null;
  }
  setbeforeCheckout(value: boolean): void {
    this._beforeCheckout = value || null;
  }
  
  
  getUserId = (): string | null => this._userId;
  getiswishlist = (): boolean | null => this._iswishlist;

  getbeforeCheckout = (): boolean | null => this._beforeCheckout;

  
  getProductDetails = (): object | null => this._productDetails;
  getdiliverLocation  = (): object | null => this._diliverLocation ;

  getpickuplocation = (): object | null => this._pickuplocation;


  getQuantity = (): number | null => this._quantity;
  gettotalAmount = (): number | null => this._totalAmount;

  getStatus = (): string | null => this._status;


  getEntityMappings() {
    return {
      userId: this.getUserId(),
      productDetails: this.getProductDetails(),
      quantity: this.getQuantity(),
      status: this.getStatus(),
      iswishlist: this.getiswishlist(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pickuplocation:this.getpickuplocation(),
      diliverLocation:this.getdiliverLocation(),
      beforeCheckout:this.getbeforeCheckout(),
      totalAmount:this.gettotalAmount()

      
    };
  }
}
