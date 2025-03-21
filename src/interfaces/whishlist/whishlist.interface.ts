export enum  wishlistStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  CLEARED = 'CLEARED',
  FAILED = 'FAILED',
}
export interface Specifications1 {
feature: { name: string; type: [],unit: string }[]; 
selected: string; 
unit: string
 }

export interface wishlistInterface {
  userId: string;
  productDetails: string;
  status: string; // ACTIVE <default> | PENDING | PROCESSED | CLEARED | FAILED |
  isinCart: boolean;
}

export interface ProductDetails1 {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number
}