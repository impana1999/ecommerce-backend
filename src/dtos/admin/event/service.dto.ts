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
  IsMongoId,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';



export class ServiceDto {
  @IsString()
  @IsNotEmpty()

  public name: string;

  @IsString()
 
  public imageUrl: string;

  @IsString()
 
  public type: string;

  @IsArray()
  
  public details?: [
    {
      label?: string;
      imageUrl?: string;
      description?: string;
      amount?: string;
      mealType?: string;
    },
  ];
}


export class UpdateServiceDto {

  
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public imageUrl?: string;

  @IsString()
  @IsOptional()
  public type?: string;

  @IsArray()
  @IsOptional()
  public details?: [
    {
      label?: string;
      imageUrl?: string;
      description?: string;
      amount?: string;
      mealType?: string;
    },
  ];
}

