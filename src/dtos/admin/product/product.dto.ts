import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    IsUUID,
    Length,
    Matches,
    IsDefined,
    MinLength,
    IsBoolean,
    IsArray,
    IsObject,
    ValidateNested,
    isArray,
  } from 'class-validator';
import { isAbsolute } from 'path';

  export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsArray()
    imageUrl: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    @IsNotEmpty()
    price: string;
  
    @IsNumber()
    @IsNotEmpty()
    daysToReturn: number;

    @IsNumber()
    @IsNotEmpty()
    availability: number;

    @IsNotEmpty()
    @IsArray()
    features: [];
    
    @IsNotEmpty()
    @IsArray()
    subCategories : [any]
  }

  export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsArray()
    @IsOptional()
    imageUrl?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsOptional()
    price?: string;

    @IsNumber()
     @IsOptional()
    daysToReturn?: number;

    @IsNumber()
    @IsOptional()
    availability?: number;
   
    @IsArray()
    @IsOptional()
    features?: [];

    @IsArray()
    @IsOptional()
    subCategoryIds? : [string]
  }