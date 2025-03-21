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
} from 'class-validator';

class Permissions {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsArray()
  @IsNotEmpty()
  public value: [];
}

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsArray()
  @IsNotEmpty()
  public permissions: Permissions;

  @IsBoolean()
  @IsNotEmpty()
  public isActive: boolean;
}

export class UpadateRoleDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsArray()
  @IsOptional()
  public permissions?: Permissions[];
}
