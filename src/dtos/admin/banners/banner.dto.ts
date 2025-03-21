import {
    IsEmail,IsNotEmpty,IsNumber,IsNumberString,IsOptional,IsString,IsUUID,Length,Matches,IsDefined,MinLength,IsBoolean} from 'class-validator';
  
  export class BannerDto {
    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsString()
    @IsNotEmpty()
    public text: string;

    @IsString()
    @IsNotEmpty()
    public subText: string;
  
    @IsString()
    @IsNotEmpty()
    public imageUrl: string;

    @IsString()
    @IsNotEmpty()
    public description: string;

    @IsNumber()
    @IsNotEmpty()
    public expiryDate: number;

    @IsBoolean()
    @IsNotEmpty()
    public active: boolean;
  
    @IsString()
    @IsNotEmpty()
    public status: string;
  }


  export class UpdateBannerDto {
    @IsString()
    @IsOptional()
    public title?: string;

    @IsString()
    @IsOptional()
    public text?: string;

    @IsString()
    @IsOptional()
    public subText?: string;
  
    @IsString()
    @IsOptional()
    public imageUrl?: string;

    @IsString()
    @IsOptional()
    public description?: string;

    @IsNumber()
    @IsOptional()
    public expiryDate?: number;

    @IsBoolean()
    @IsOptional()
    public active?: boolean;
  
    @IsString()
    @IsOptional()
    public status?: string;
  }