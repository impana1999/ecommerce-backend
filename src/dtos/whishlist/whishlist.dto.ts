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
} from 'class-validator';


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
    
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class WhisshlistDto {
    @IsString()
    @IsNotEmpty()
    userId:string;

    @IsObject()
    @IsNotEmpty()
    productDetails: ProductDetails;

    @IsBoolean()
    @IsOptional()
    isinCart: boolean;
  

    @IsString()
    @IsNotEmpty()
    status: string;
    
}