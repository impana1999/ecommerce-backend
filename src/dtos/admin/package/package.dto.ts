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
  IsEnum,
} from 'class-validator';

import { EventTypes } from '@interfaces/index'

class ActivityDetails {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

class AddOns {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

class Location {
  @IsString()
  @IsNotEmpty()
  name: string;

 
  @IsString()
  @IsNotEmpty()
  id: string;
}

class Price {

  @IsNumber()
  @IsOptional()
  hour: number;
 
  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  unit: string;

}


class Features {
  
  @IsString()
  @IsOptional()
  game: string;
 
  @IsString()
  @IsOptional()
  location: Location;

  @IsString()
  @IsOptional()
  days: string;

  @IsString()
  @IsOptional()
  timeRange: string;

  @IsArray()
  @IsOptional()
  prices: Price;

}

export class PackageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EventTypes)
  eventType: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  activities: string;

  @IsOptional()
  @IsArray()
  activityDetails: ActivityDetails[];

  @IsArray()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  addOns: AddOns[];

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsNumber()
  @IsOptional()
  peopleIncluded: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  @IsArray()
  locations: Location[];
  
  @IsOptional()
  @IsArray()
  features: Features[];
}

export class UpdatePackageDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subTitle?: string;

  @IsString()
  @IsOptional()
  eventType?: string;

  @IsString()
  @IsOptional()
  activities?: string;

  @IsOptional()
  @IsArray()
  activityDetails?: ActivityDetails[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  addOns?: AddOns[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  peopleIncluded?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsOptional()
  @IsArray()
  locations?: Location[];

  @IsOptional()
  @IsArray()
  features?: Features[];
  
}
