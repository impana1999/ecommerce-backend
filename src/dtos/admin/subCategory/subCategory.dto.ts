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
  } from 'class-validator';

  export class SubCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
  
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @IsArray()
    @IsNotEmpty()
    categoryIds : [];

  }

  export class UpdateSubCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
  
    @IsArray()
    @IsOptional()
    categoryIds?: [];

  }