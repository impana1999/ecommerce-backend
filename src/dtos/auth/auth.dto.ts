import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, Length, Matches, IsDefined, MinLength, IsBoolean } from 'class-validator';


export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(8)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  public password: string;
}

export class MobileLoginDto {
  @IsNumberString()
  @IsNotEmpty()
  //@Min(10)
  public mobileNumber: string;
}

export class OtpDto {
  @IsNumberString()
  @IsNotEmpty()
  //@Min(10)
  public mobileNumber: string;

  @IsNotEmpty()
  @IsNumber()
  public otp : number;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  public email: string;
 
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(8)
  // // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  // public password: string;

}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  public email: string;
 
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  public password: string;
}

export class SignUpDto {
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  public password: string;


  @IsNumberString()
  @IsNotEmpty()
  public mobileNumber: string;

  @IsNumberString()
  @IsNotEmpty()
  //@Min(10)
  public countryCode: string;

  @IsString()
  @IsNotEmpty()
  public gender: string;

  @IsString()
  @IsNotEmpty()
  public dateOfBirth: string;
  
  @IsString()
  @IsNotEmpty()
  public nationality: string;

  @IsBoolean()
  @IsNotEmpty()
  public proBowler: string;

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;


 
}

export class ChangePasswordwithNumberDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsString()
  public mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  public userId: string;

}

export class ChnagePasswordDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsString()
  public mobileNumber: string;
 
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public oldPassword: string;
}