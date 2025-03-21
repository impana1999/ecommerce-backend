import {AdminStatus} from "@interfaces/index"

//Author : Srinivas
export default class AdminModel {
  private _email: string;
  private _password: string;
  private _countryCode: string;
  private _mobileNumber: string;
  private _otp: number;
  private _firstName: string;
  private _lastName: string;
  private _role: string;
  private _status: string;
  private _emailOtp: number;
  private _userType: string;
  private _isLoggedIn : boolean;

  constructor({
    email = '',
    password = '',
    countryCode = '',
    mobileNumber = '',
    otp = 0,
    firstName = '',
    lastName = '',
    role = '',
    status = AdminStatus.INACTIVE,
    emailOtp = 0,
    userType = '',
    isLoggedIn = false,

  }) {

    this._email = email;
    this._password = password;
    this._countryCode = countryCode;
    this._mobileNumber = mobileNumber;
    this._otp = otp;
    this._firstName = firstName;
    this._lastName = lastName;
    this._role = role;
    this._status = status;
    this._emailOtp = emailOtp;
    this._userType = userType;
    this._isLoggedIn = isLoggedIn;

  }


  setEmail(value: string): void {
    this._email = value;
  }

  setPassword(value: string): void {
    this._password = value;
  }

  setCountryCode(value: string): void {
    this._countryCode = value || null;
  }

  setMobileNumber(value: string): void {
    this._mobileNumber = value || null;
  }

  setOtp(value: number): void {
    this._otp = value;
  }

  setFirstName(value: string): void {
    this._firstName = value || null;
  }

  setLastName(value: string): void {
    this._lastName = value || null;
  }

  setRole(value: string): void {
    this._role = value || null;
  }

  setStatus(value: string): void {
    this._status = value || null;
  }

  setEmailOtp(value: number): void {
    this._emailOtp = value;
  }

  setUserType(value: string): void {
    this._userType = value || null;
  }

  setIsLoggedIn(value : boolean) : void {
    this._isLoggedIn = value ||null;
  }


  getEmail = (): string | null => this._email;

  getPassword = (): string | null => this._password;

  getCountryCode = (): string | null => this._countryCode;

  getMobileNumber = (): string | null => this._mobileNumber;

  getOtp = (): number | null => this._otp;

  getFirstName = (): string | null => this._firstName;

  getLastName = (): string | null => this._lastName;

  getRole = (): string | null => this._role;

  getStatus = (): string | null => this._status;

  getEmailOtp = (): number | null => this._emailOtp;

  getUserType = (): string | null => this._userType;

  getIsLoggedIn = () : boolean | null => this._isLoggedIn;


  getEntityMappings() {
    return {
      email: this.getEmail(),
      password: this.getPassword(),
      countryCode: this.getCountryCode(),
      mobileNumber: this.getMobileNumber(),
      otp: this.getOtp(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      role: this.getRole(),
      status: this.getStatus(),
      emailOtp: this.getEmailOtp(),
      userType: this.getUserType(),
      isLoggedIn: this.getIsLoggedIn(),

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    };
  }
}
