import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsString,
    ValidateNested,
    IsDate,
    IsArray,
    IsOptional,
    isBoolean,
} from 'class-validator';
class Specifications {
    @IsArray()
    @IsNotEmpty()
    feature: [ ];
    
    @IsString()
    @IsNotEmpty()
    selected: string;
    
    @IsString()
    @IsNotEmpty()
    unit: string;
}

class ProductDetails {
    @IsString()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
    
    @IsArray()
    @IsNotEmpty()
    specifications: Specifications[];
    
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CartDto {
    @IsString()
    @IsNotEmpty()
    userId:string;

    @IsObject()
    @IsNotEmpty()
    productDetails: ProductDetails;

    @IsString()
    @IsNotEmpty()
    status: string;
    
    @IsBoolean()
    @IsOptional()
    iswishlist:boolean;

    
}