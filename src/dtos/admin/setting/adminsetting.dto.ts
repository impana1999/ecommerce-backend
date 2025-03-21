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

  export class AdminSettingDto {
    @IsString()
    @IsNotEmpty()
    type: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;

  }

  export class UpdateAdminSettingDto {
    @IsString()
    @IsOptional()
    type?: string;
  
    @IsString()
    @IsOptional()
    description?: string;

  }