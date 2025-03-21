import { type } from "os";

export enum BookingStatus {
  PENDING = 'PENDING',
  BOOKED = 'BOOKED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CalculateBookingTotalInterface {
  packageId: string,
  packageQuantity: number,
  extraGuests: number,
  extraMeals: number,
  totalGuests: number;
  totalMeals: number;
}


export interface PackageDetailsInterface {
  id: string,
  name: string,
  quantity: number
}

export interface BranchInterface {
  id: string,
  name: string,
}

export interface EventInterface {
  id: string,
  type: string
}

export interface CelebrantInterface {
  name: string,
  birthDate: string,
  birthMonth: string,
  birthYear: string,
}

export interface ServiceInterface {
  _id: string,
  name: string,
  type: string,
  imageUrl: string,
  label: string,
  description: string,
  amount: string;

}

export interface UserInterface{
  id: string,
  name: string,
  
  }


export interface BookingInterface {

  event: EventInterface,
  packageDetails: PackageDetailsInterface,
  // package: PackageInterface ,

  extraGuests?: number,
  extraMeals?: number,
  totalGuests: number,
  totalMeals: number,
  branch?: BranchInterface,
  userDetails : UserInterface,
  celebrantDetails: CelebrantInterface,
  eventDate?: number,
  eventTime?: number,
  isPrivate: boolean,
  eventType: String,
  services?: ServiceInterface[],
  additionalRequests?: string,
  status: string,
  e_invitation: string;
  banner: string;
  bowllingMedal:string;
  uploadlogo:string;
  decoration:string;
  cancelReason:string;
  qrCode:string;
  review:boolean;
  createdAt: number,
  updateAt: number,
  eventEndTime:number,
  duration:number
}