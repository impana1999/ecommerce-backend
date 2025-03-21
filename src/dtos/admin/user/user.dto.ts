import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, Length, Matches, IsDefined, MinLength, IsBoolean } from 'class-validator';



export class UpdateUSerDto {
  
  
    @IsString()
    @MinLength(8)
    @IsOptional()
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    public password?: string;
  
  
    @IsString()
    @IsOptional()
    public firstName?: string;
  
    @IsString()
    @IsOptional()
    public lastName?: string;

  }


  