import { Request } from 'express';
// import { IUser } from '@/interfaces/';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: any;
  clientIP: string | number;
  reqUrlPath: string;
}

export enum AdminStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  ONBOARDED = 'ONBOARDED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  BLACK_LISTED = 'BLACK_LISTED',
}

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
