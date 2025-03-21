export interface Specifications4 {
  feature: { name: string; type: [],unit: string }[]; 
  selected: string; 
  unit: string
   }
export interface ProductDetails4 {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity:number;
  specifications: Specifications4[];
}
export interface pickuplocation1{
  branchId:string,
  name:string,
  address:string,
  city:string,
  state:string,
  country:string,
  imageUrl:string,
  zipCode:string,
}
export interface diliverLocation1{
  name:string,
  address:string,
  city:string,
  state:string,
  country:string,
  imageUrl:string,
  zipCode:string,
  AddressId:string
}
export interface OrderInterface {
   amount:number;
   currency: string;
   receipt:string;
   customerId:string;
   orderId:string;
   amount_paid:string;
   amount_due:string;
  status:string;
  ProductDetails:ProductDetails4[];
  eventId:string,
  razorpay_payment_id:string;
  razorpay_signature:string;
  isOrdered:boolean;
  tournamentId:string;
  orderType:string;
  isCancelled:boolean;
  qrCode:string
  pickuplocation: pickuplocation1; 
  diliverLocation:diliverLocation1;
  
}
