export interface Category {
    name: string;
    imageUrl: string;
    isActive: boolean;
}

export interface Subcategory {
    name: string;
    imageUrl: string;
    isActive: boolean;
    categoryIds: string[] // <ObjectId of category document>
}

export interface Product {
    name : string;
    imageUrl : [];
    description : string;
    price : string;
    features : string[],
    createdAt: number,
  updateAt: number,
}