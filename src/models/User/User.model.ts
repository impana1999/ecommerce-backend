import { PointLevel, SocialInterface, UserInterface } from '@/interfaces/user/user.interface';


export default class UserModel {
  private _email: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _countryCode: string;
  private _mobileNumber: string;
  private _nationality: string;
  private _otp: number;
  private _emailOtp: number;
  private _status: string;
  private _isLoggedIn: boolean;
  private _gender: string;
  private _dateOfBirth: string;
  private _proBowler: boolean;
  private _profilePicture: string;
  private _userType: string;
  private _socials: SocialInterface[];
  private _points: number;
  private _pointLevel: PointLevel;
  private _mobileNumberOtp :number;
  private _customerId :string;

  constructor({ 
    email = '', 
    password = '', 
    firstName = '', 
    lastName = '', 
    countryCode = '', 
    mobileNumber = '', 
    nationality = '',
    otp = 0,
    emailOtp = 0,
    status = '',
    isLoggedIn = true,
    gender = '',
    dateOfBirth = '',
    proBowler = false,
    profilePicture = '',
    userType = '',
    socials = [{ name: "", url:""}],
    points = 0,
    mobileNumberOtp=0,
    pointLevel = PointLevel.BEGINNER,
    customerId=''
   }) {

    this._email = email;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
    this._countryCode = countryCode;
    this._mobileNumber = mobileNumber;
    this._nationality = nationality;
    this._otp = otp;
    this._emailOtp = emailOtp;
    this._status = status;
    this._isLoggedIn = isLoggedIn;
    this._gender = gender;
    this._dateOfBirth = dateOfBirth;
    this._proBowler = proBowler;
    this._profilePicture = profilePicture;
    this._userType = userType;
    this._socials = socials;
    this._points = points;
    this._pointLevel = pointLevel;
    this._mobileNumberOtp = mobileNumberOtp;
    this._customerId = customerId;

  }
  

  setEmail(value: string): void {
    this._email = value;
  }
  
  setPassword(value: string): void {
    this._password = value;
  }

  setFirstName(value: string): void {
    this._firstName = value || null;
  }

  setLastName(value: string): void {
    this._lastName = value || null;
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
  
  setEmailOtp(value: number): void {
    this._emailOtp = value;
  }

  setStatus(value: string): void {
    this._status = value || null;
  }

  setIsLoggedIn(value: string): void {
    this._lastName = value || null;
  }

  setGender(value: string): void {
    this._gender = value || null;
  }

  setNationality(value: string): void {
    this._nationality = value || null;
  }

  setDateOfBirth(value: string): void {
    this._dateOfBirth = value || null;
  }

  setProBowler(value: boolean): void {
    this._proBowler = value || false;
  }

  setProfilePicture(value: string): void {
    this._profilePicture = value || null;
  }

  setUserType(value: string): void {
    this._userType = value || null;
  }

  setSocials(value: SocialInterface[]): void {
    this._socials = value || null;
  }

  setPoints(value: number): void {
    this._points = value || 0;
  }

  setPointsLevel(value: PointLevel): void {
    this._pointLevel = value || null;
  }

  setmobileNumberOtp(value: number): void {
    this._mobileNumberOtp = value || null;
  }

  setcustomerId(value: string): void {
    this._customerId = value || null;
  }
  
  getEmail = (): string | null => this._email;

  getPassword = (): string | null => this._password;

  getFirstName = (): string | null => this._firstName;

  getLastName = (): string | null => this._lastName;

  getCountryCode = (): string | null => this._countryCode;

  getMobileNumber = (): string | null => this._mobileNumber;

  getNationality = (): string | null => this._nationality;

  getOtp = (): number | null => this._otp;

  getEmailOtp = (): number | null => this._emailOtp;

  getIsLoggedIn = (): boolean | null => this._isLoggedIn;

  getStatus = (): string | null => this._status;

  getGender = (): string | null => this._gender;

  getDateOfBirth = (): string | null => this._dateOfBirth;

  getProBowler = (): boolean | null => this._proBowler;

  getProfilePicture = (): string | null => this._profilePicture;

  getUserType = (): string | null => this._userType;

  getSocials = (): SocialInterface [] | null => this._socials;

  getPoints = (): number | null => this._points;

  getPointLevel = (): PointLevel | null => this._pointLevel;

  getmobileNumberOtp = (): number | null => this._mobileNumberOtp;

  getcustomerId = (): string | null => this._customerId;
  

  getEntityMappings() {
    return {
      email: this.getEmail(),
      password: this.getPassword(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      countryCode: this.getCountryCode(),
      mobileNumber: this.getMobileNumber(),
      nationality: this.getNationality(),
      otp: this.getOtp(),
      emailOtp: this.getEmailOtp(),
      isLoggedIn: this.getIsLoggedIn(),
      status: this.getStatus(),
      gender: this.getGender(),
      dateOfBirth: this.getDateOfBirth(),
      proBowler: this.getProBowler(),
      profilePicture: this.getProfilePicture(),
      userType: this.getUserType(),
      socials: this.getSocials(),
      points: this.getPoints(),
      pointLevel: this.getPointLevel(),
      mobileNumberOtp:this.getmobileNumberOtp(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerId: this.getcustomerId(),
    };
  }
}
