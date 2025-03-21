// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { sendSMSWithSNS } from '@/lib/aws-sns-sms';
import { sendSMSWithTwilio } from '@/lib/twilio';
import {
  generateAccessToken,
  generateRefreshToken,
  getAccessTokenExpiry,
  getRefreshTokenExpiry
} from '@globals/jwt.global'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { UserModel } from '@models/index';
import { TokenService } from '@services/index';

const useTwilioCountry = ['1'];


export default class HomepageService {

  /**
   * Get banners list 
   */
  public async getBanners() {
    return [
      { name: "Banner 1" },
      { name: "Banner 2" }
    ]
  }

  public async getServices() {
    return {
      services: [
        "Book Event",
        "Book Games",
        "Near By Stores"
      ]
    }
  }

  public async getFeaturedProducts() {
    return {
      products: [
        { name: "Bowling Ball" },
        { name: "Shoes" },
        { name: "Jersey" }
      ]
    }
  }

  public async getUpcomingTournaments() {
    return {
      tournaments: [
        { name: "Test Tournament 1" },
        { name: "Test Tournament 2" },
        { name: "Test Tournament 3" }
      ]
    }
  }

  public async getUpcomingEvents() {
    return {
      events: [
        { name: "Test Event 1" },
        { name: "Test Event 2" },
        { name: "Test Event 3" }
      ]
    }
  }

}
