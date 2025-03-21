import {
  IsEmail,IsNotEmpty,IsNumber,IsNumberString,IsOptional,IsString,IsUUID,Length,Matches,IsDefined,MinLength,IsBoolean,IsArray} from 'class-validator';

export class EventBookDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public imageUrl: string;
  
  @IsString()
  @IsNotEmpty()
  public type: string;

}
export class EventUpdateDto {

  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public imageUrl?: string;

  @IsString()
  @IsOptional()
  public status?: string;
  

  @IsArray()
  @IsOptional()
  public services? : string[]

}