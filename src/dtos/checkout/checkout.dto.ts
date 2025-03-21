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
class ProductDetails3{
    @IsString()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsArray()
    @IsNotEmpty()
    specifications: Specifications[];
    @IsNumber()
    @IsOptional()
    quantity:number;
    @IsNumber()
    @IsOptional()
    availability:number;
}
class Pickuplocation{
    @IsString()
    @IsNotEmpty()
    branchId:string
    @IsString()
    @IsNotEmpty()
    name:string
    @IsString()
    @IsNotEmpty()
    address:string
    @IsString()
    @IsNotEmpty()
    city:string
    @IsString()
    @IsNotEmpty()
    state:string
    @IsString()
    @IsNotEmpty()
    country:string
    @IsString()
    @IsNotEmpty()
    imageUrl:string
    @IsString()
    @IsNotEmpty()
    zipCode:string
    
}
class DiliverLocation{
    @IsString()
    @IsNotEmpty()
    AddressId:string
    @IsString()
    @IsNotEmpty()
    name:string
    @IsString()
    @IsNotEmpty()
    address:string
    @IsString()
    @IsNotEmpty()
    city:string
    @IsString()
    @IsNotEmpty()
    state:string
    @IsString()
    @IsNotEmpty()
    country:string
    @IsString()
    @IsNotEmpty()
    imageUrl:string
    @IsString()
    @IsNotEmpty()
    zipCode:string
    
}
export class CheckoutDto {
    @IsString()
    @IsNotEmpty()
    userId:string;

    @IsArray()
    @IsNotEmpty()
    productDetails: ProductDetails3;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsString()
    @IsOptional()
    status: string;
    
    @IsNumber()
    @IsOptional()
    totalAmount:boolean;

    @IsObject()
    @IsOptional()
    pickuplocation:Pickuplocation
    @IsObject()
    @IsOptional()
    diliverLocation:DiliverLocation;
    @IsBoolean()
    @IsOptional()
    beforeCheckout:boolean;
}