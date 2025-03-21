
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
  isNotEmpty,
} from 'class-validator';

class Coordinates1 {
  @IsString()
  @IsOptional()
  lat?: string;

  @IsString()
  @IsOptional()
  long?: string;
}


export class AddressUpdateDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public address?: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsString()
  @IsOptional()
  public state?: string;

  @IsString()
  @IsOptional()
  public country?: string;

  @IsString()
  @IsOptional()
  public zipCode?: string;

  @IsString()
  @IsOptional()
  public status?: string;

  @IsObject()
  @IsOptional()
  coordinates?: Coordinates1;

}

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  userId:string;
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public city: string;

  @IsString()
  @IsNotEmpty()
  public state: string;

  @IsString()
  @IsNotEmpty()
  public country: string;

  @IsString()
  @IsNotEmpty()
  public zipCode: string;

  @IsObject()
  @IsNotEmpty()
  public coordinates: Coordinates1;
  
  @IsString()
  @IsOptional()
  status:string;

}
