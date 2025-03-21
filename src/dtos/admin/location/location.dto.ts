
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

class Coordinates {
  @IsString()
  @IsOptional()
  lat?: string;

  @IsString()
  @IsOptional()
  long?: string;
}

class ServicesInfo {
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;
}

class BranchManager {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;

  @IsString()
  @IsOptional()
  role?: string;
}

export class LocationUpdateDto {
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
  public imageUrl?: string;

  @IsString()
  @IsOptional()
  public branchCode?: string;

  @IsString()
  @IsOptional()
  public status?: string;

  @IsOptional()
  public isActive?: boolean;


  @IsObject()
  @IsOptional()
  coordinates?: Coordinates;

 
  @IsObject()
  @IsOptional()
  branchManager?: BranchManager;

  @IsArray()
  @IsOptional()
  public services? : string[]
}

export class CreateLocationDto {
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
  public coordinates: Coordinates;

  @IsString()
  @IsNotEmpty()
  public imageUrl: string;

  @IsString()
  @IsOptional()
  public branchCode: string;

  @IsObject()
  @IsOptional()
  public branchManager: BranchManager;
  
  @IsArray()
  @IsOptional()
  public services: ServicesInfo[];

}
