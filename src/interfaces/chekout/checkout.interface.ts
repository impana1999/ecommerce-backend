export enum CheckoutStatus {
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    PROCESSED = 'PROCESSED',
    CLEARED = 'CLEARED',
    FAILED = 'FAILED',
  }
  export interface Specifications2 {
    feature: { name: string; type: [],unit: string }[]; 
    selected: string; 
    unit: string
     }
  export interface ProductDetails2 {
      id: string;
      name: string;
      imageUrl: string;
      specifications: Specifications2[];
      price: number;
      quantity:number;
      availability:number;
    }
  export interface pickuplocation{
    branchId:string,
    name:string,
    address:string,
    city:string,
    state:string,
    country:string,
    imageUrl:string,
    zipCode:string,
  }
  export interface diliverLocation{
    name:string,
    address:string,
    city:string,
    state:string,
    country:string,
    imageUrl:string,
    zipCode:string,
    AddressId:string
  }
  export interface CheckoutInterface {
    userId: string;
    productDetails: ProductDetails2[];
    quantity: number;
    pickuplocation: pickuplocation; 
    diliverLocation:diliverLocation;
    totalAmount:number,
    beforeCheckout:boolean
  }
  