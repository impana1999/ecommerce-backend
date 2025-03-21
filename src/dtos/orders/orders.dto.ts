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
    isArray,
} from 'class-validator';

class Specifications4 {
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
class ProductDetails4 {
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
    specifications: Specifications4[];
    
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    
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
class UserShortDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
export class OrderDto {
    @IsString()
    @IsOptional()
    userId:string;
    @IsNumber()
    @IsOptional()
    amount:number;
    @IsString()
    @IsOptional()
    currency:string;
    @IsString()
    @IsOptional()
    receipt:string;
    @IsString()
    @IsOptional()
    customer_id:string;
    @IsString()
    @IsOptional()
    orderId:string;
    @IsString()
    @IsOptional()
    amount_paid:string;
    @IsString()
    @IsOptional()
    amount_due:string;
    @IsString()
    @IsOptional()
    status:string;
    @IsArray()
    @IsOptional()
    productDetails: ProductDetails4[];
    @IsString()
    @IsOptional()
    eventId:string;
    @IsString()
    @IsOptional()
    razorpay_payment_id:string;
    @IsString()
    @IsOptional()
    razorpay_signature:string;

    @IsBoolean()
    @IsOptional()
    isOrdered:boolean;
    @IsString()
    @IsOptional()
    tournamentId:string;
    @IsString()
    @IsOptional()
    orderType:string;

    @IsBoolean()
    @IsOptional()
    isCancelled:boolean;
    @IsString()
    @IsOptional()
    qrCode:string;

    @IsObject()
    @IsOptional()
    pickuplocation:Pickuplocation
    @IsObject()
    @IsOptional()
    diliverLocation:DiliverLocation;
}