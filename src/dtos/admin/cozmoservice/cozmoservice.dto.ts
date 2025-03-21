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

  export class CozmoServiceDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
  
    @IsString()
    @IsNotEmpty()
    description: boolean;

  }

  export class UpdateCozmoServiceDto {
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    imageUrl?: string;
  
    @IsString()
    @IsOptional()
    description?: boolean;

  }