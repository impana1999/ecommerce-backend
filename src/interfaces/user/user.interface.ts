export enum PointLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    PRO = 'PRO',
    VIP = 'VIP',
}


export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
    ONBOARDED = 'ONBOARDED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    SUSPENDED = 'SUSPENDED',
    BLACK_LISTED = 'BLACK_LISTED',
}


export interface SocialInterface {
    name: string;
    url: string;
}


export interface UserInterface {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    mobileNumber: string;
    otp: number;
    emailOtp: string;
    mobileNumberOtp:string;
    status: string;
    isLoggedIn: boolean;
    gender?: string;
    dateOfBirth?: string;
    proBowler?: boolean;
    profilePicture?: string;
    userType: string;
    socials?: SocialInterface [];
    points?: number;
    pointsLevel?: string;
    customerId:string;
}