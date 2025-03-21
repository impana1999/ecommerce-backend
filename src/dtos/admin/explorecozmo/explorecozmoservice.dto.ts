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

  export class ExploreCozmoDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    imageUrl: string;

  }

  export class UpdateExploreCozmoDto{
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    imageUrl?: string;

  }