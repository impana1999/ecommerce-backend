export enum CartStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  CLEARED = 'CLEARED',
  FAILED = 'FAILED',
}
export interface Specifications {
feature: { name: string; type: [],unit: string }[]; 
selected: string; 
unit: string
 }
export interface ProductDetails {
  id: string;
  name: string;
  imageUrl: string;
  specifications: Specifications[];
  price: number;
  quantity:number;
  availability:number;
}

export interface CartInterface {
  userId: string;
  productDetails: ProductDetails;
  quantity: number;
  status: string; // ACTIVE <default> | PENDING | PROCESSED | CLEARED | FAILED |
  iswishlist: boolean
}
