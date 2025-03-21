import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, Length, Matches, IsDefined, MinLength, IsBoolean, Min } from 'class-validator';


export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  public password: string;


  // public  loginStatus: boolean;
}

export class AdminMobileLoginDto {

  @IsNumberString()
  @IsNotEmpty()
  // @Min(1)
  public countryCode: string;

  @IsNumberString()
  @IsNotEmpty()
  //@Min(10)
  public mobileNumber: string;
 
}

export class AdminSignUpDto {
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
  //@Min(10)
  public countryCode: string;

  @IsNumberString()
  @IsNotEmpty()
  //@Min(10)
  public mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

}
export class ForgotAuthPasswordDto {
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
export class AdminOtpDto {
  @IsNumberString()
  @IsNotEmpty()
  //@Min(10)
  public mobileNumber: string;

  @IsNotEmpty()
  @IsNumber()
  public otp : number;
}
export class AdminResetPasswordDto {
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
