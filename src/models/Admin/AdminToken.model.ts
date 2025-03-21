import mongoose from 'mongoose';

// Author:Somanath
// Created AdminTokenModel 
export default class AdminTokenModel {
  private _adminId: mongoose.Types.ObjectId | null;
  private _accessToken: string;
  private _refreshToken: string;
  
  constructor({ 
    adminId = null, 
    accessToken = '', 
    refreshToken = '', 
   }) {

    this._adminId = adminId;
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;

  }
  

  setAdminId(value: mongoose.Types.ObjectId | null): void {
    this._adminId = value;
  }
  
  setAccessToken(value: string): void {
    this._accessToken = value;
  }

  setRefreshToken(value: string): void {
    this._refreshToken = value;
  }


  getAdminId = (): mongoose.Types.ObjectId | null => this._adminId;

  getAccessToken = (): string | null => this._accessToken;

  getRefreshToken = (): string | null => this._refreshToken;

  getEntityMappings() {
    return {
      adminId: this.getAdminId(),
      accessToken:this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
