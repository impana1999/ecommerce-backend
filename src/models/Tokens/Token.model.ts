import mongoose from 'mongoose';

// Author:Somanath
// Created TokenModel 
export default class TokenModel {
  private _userId: mongoose.Types.ObjectId | null;
  private _accessToken: string;
  private _refreshToken: string;
  private _accessExpiryTime: string;
  private _refreshExpiryTime: string;
  
  constructor({ 
    userId = null, 
    accessToken = '', 
    refreshToken = '', 
    accessExpiryTime= '',
    refreshExpiryTime= ''
   }) {

    this._userId = userId;
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._accessExpiryTime=accessExpiryTime;
    this._refreshExpiryTime=refreshExpiryTime

  }
  

  setUserId(value: mongoose.Types.ObjectId | null): void {
    this._userId = value;
  }
  
  setAccessToken(value: string): void {
    this._accessToken = value;
  }

  setRefreshToken(value: string): void {
    this._refreshToken = value;
  }

  setAccessExpiryTime(value: string): void {
    this._accessExpiryTime = value;
  }

  setRefreshExpiryTime(value: string): void {
    this._refreshExpiryTime = value;
  }

  getAdminId = (): mongoose.Types.ObjectId | null => this._userId;

  getAccessToken = (): string | null => this._accessToken;

  getRefreshToken = (): string | null => this._refreshToken;

  getAccessExpiryTime = (): string | null => this._accessExpiryTime;

  getRefreshExpiryTime =(): string | null => this._refreshExpiryTime;

  getEntityMappings() {
    return {
      adminId: this.getAdminId(),
      accessToken:this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
      accessExpiryTime:this.getAccessExpiryTime(),
      refreshExpiryTime:this.getRefreshExpiryTime(),
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}