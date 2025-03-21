// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import * as qr from 'qrcode';
import { isEmpty } from '@utils/util';
import { sendSMSWithSNS } from '@/lib/aws-sns-sms';
import { sendSMSWithTwilio } from '@/lib/twilio';
import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from '@globals/jwt.global';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { BookingSchema, BookingModel, UserModel, PackageModel } from '@models/index';
import { TokenService } from '@services/index';
import { BookingInterface, CalculateBookingTotalInterface } from '@/interfaces';
import * as sendMail from '@/middlewares/email.services';


export default class BookingService {

  private bookingModel = BookingModel;
  private userModel = UserModel;
  private packageModel = PackageModel;


  // private async calculateBookingTotal(bookingDetails: CalculateBookingTotalInterface) {
  //   try {

  //     const packageDetails = await this.packageModel.findById(bookingDetails.packageId);

  //     const packageAmount = Number(packageDetails.amount);
  //     const guestsAddOnAmount = packageDetails.addOns[0].amount;
  //     const mealsAddOnAmount = packageDetails.addOns[1].amount;

  //     const totalAmount = (packageAmount * bookingDetails.packageQuantity) +
  //       (guestsAddOnAmount * bookingDetails.extraGuests) +
  //       (mealsAddOnAmount * bookingDetails.extraMeals)

  //     return totalAmount;
      
  //   } catch (err) {
  //     throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  //   }
  // }

  //Author : Srinivas
  //Creates new booking and stores into "bookings" collection.
  private async calculateBookingTotal(bookingDetails: CalculateBookingTotalInterface) {
    try {
      const packageDetails = await this.packageModel.findById(bookingDetails.packageId);
  
      const packageAmount = Number(packageDetails.amount);
      let totalAmount = packageAmount * bookingDetails.packageQuantity;
  
      if (packageDetails.addOns && packageDetails.addOns.length >= 2) {
        const guestsAddOnAmount = Number(packageDetails.addOns[0].amount);
        const mealsAddOnAmount = Number(packageDetails.addOns[1].amount);
  
        totalAmount +=
          guestsAddOnAmount * bookingDetails.extraGuests +
          mealsAddOnAmount * bookingDetails.extraMeals;
      }
  
      return totalAmount;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  public async createBooking(userId, bookingInput: {
    event: {
      id: string;
      type: string;
    };
    packageDetails: {
      id: string;
      type: string;
      quantity: number;
    };
    extraGuests: number;
    extraMeals: number;
    totalGuests: number;
    totalMeals: number;
    branch: {
      id: string;
      name: string;
    };
    userDetails: {
      id: string;
      name: string;
    };
    celebrantDetails: {
      name: string;
      birthDate: string;
      birthMonth: string;
      birthYear: string;
    };
    eventDate: number;
    eventTime: number;
    isPrivate: boolean;
    eventType: string;
    services: [{ _id: string; name: string; type: string; imageUrl: string; label:string,discription:string,amount:string }];
    additionalRequests: string;
    status: string;
    e_invitation: string;
    eventEndTime:number;
    banner: string;
    bowllingMedal: string;
    decoration:string;
    uploadlogo: string;
    qrCode:string;
    duration:number;
  }) {
    try {
      const {
        event,
        packageDetails,
        extraGuests,
        extraMeals,
        totalGuests,
        totalMeals,
        branch,
        celebrantDetails,
        eventDate,
        eventTime,
        isPrivate,
        eventType,
        services,
        additionalRequests,
        status,
        e_invitation,
        banner,
        bowllingMedal,
        decoration,
        uploadlogo,
        eventEndTime,
        duration
      } = bookingInput;
      const existingBooking = await this.bookingModel.findOne({ 'branch.id':branch.id,'packageDetails.id': bookingInput.packageDetails.id , eventTime: bookingInput.eventTime,eventEndTime:bookingInput.eventEndTime});
  
      if (existingBooking) {
        throw new HttpException(400, 'Selected package or event time is already booked. Please select different options.');
      }
      if (e_invitation && e_invitation.trim() !== '') {
        await sendMail.sendMail(e_invitation);
      }
      const userData = await this.userModel.findById(userId, { _id: 1, firstName: 1, lastName: 1 });
      if (!userData) throw new HttpException(401, 'Invalid User');

      const userDetails = {
        id: userData._id,
        name: `${userData.firstName} ${userData.lastName}`
      }

      const totalAmount = await this.calculateBookingTotal({
        packageId: bookingInput.packageDetails.id,
        packageQuantity: bookingInput.packageDetails.quantity,
        extraGuests: bookingInput.extraGuests,
        extraMeals: bookingInput.extraMeals,
        totalGuests: bookingInput.totalGuests,
        totalMeals: bookingInput.totalMeals
      })
      const qrCodeData = JSON.stringify(bookingInput);
      const generatedQRCode = await qr.toDataURL(qrCodeData);
      
      const bookingDetails = await (
        await this.bookingModel.create({
          event,
          packageDetails,
          extraGuests,
          extraMeals,
          totalGuests,
          totalMeals,
          totalAmount,
          branch,
          userDetails,
          celebrantDetails,
          eventDate,
          eventTime,
          isPrivate,
          eventType,
          services,
          additionalRequests,
          status,
          e_invitation,
          banner,
          bowllingMedal,
        decoration,
        uploadlogo,
        qrCode:generatedQRCode,
        eventEndTime,
        duration
        })
      ).save();
      return { bookingDetails };
      
    } catch (err) {
      console.log(`Create booking error`, err);
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async getAllBookingsByUserId(userId: string) {
    try {
      // console.log(`No bookings found for user with ID: ${userId}`);
      const bookings = await this.bookingModel.find({ 'userDetails.id': userId });
      if (!bookings || bookings.length === 0) {
        console.log(`No bookings found for user with ID: ${userId}`);
        throw new HttpException(404, 'No booking found');
      }
      return bookings;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async getBookingDetails(bookingId: string) {
    try {
      const booking = await this.bookingModel.find({ _id: bookingId });
      if (!booking) {
        console.log(`No bookings found for bookin with ID: ${bookingId}`);
        throw new HttpException(404, 'No booking found');
      }
      return booking;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async updateBooking(bookingId: string, updatedData: any) {
    try {
      const booking = await this.bookingModel.findById(bookingId);

      if (!booking) { throw new HttpException(404, 'booking not found') };

      const fiveDaysInNumber = 5 * 24 * 60 * 60 * 1000;
      const timeafter5days = Date.now() +(fiveDaysInNumber );

      if(booking.eventDate <= timeafter5days) { throw new HttpException(404, 'Edit booking time expired') };

      if (updatedData.event) {
        booking.event = updatedData.event;
      }
      if (updatedData.packageDetails) {
        booking.packageDetails = updatedData.packageDetails;
      }
      if (updatedData.extraGuests) {
        booking.extraGuests = updatedData.extraGuests;
      }
      if (updatedData.extraMeals) {
        booking.extraMeals = updatedData.extraMeals;
      }
      if (updatedData.totalGuests) {
        booking.totalGuests = updatedData.totalGuests;
      }
      if (updatedData.totalMeals) {
        booking.totalMeals = updatedData.totalMeals;
      }
      if (updatedData.branch) {
        booking.branch = updatedData.branch;
      }
      if (updatedData.userDetails) {
        booking.userDetails = updatedData.userDetails;
      }
      if (updatedData.celebrantDetails) {
        booking.celebrantDetails = updatedData.celebrantDetails;
      }
      if (updatedData.eventDate) {
        booking.eventDate = updatedData.eventDate;
      }
      if (updatedData.eventTime) {
        booking.eventTime = updatedData.eventTime;
      }
      if (updatedData.isPrivate) {
        booking.isPrivate = updatedData.isPrivate;
      }
      if (updatedData.eventType) {
        booking.eventType = updatedData.eventType;
      }
      if (updatedData.services) {
        booking.services = updatedData.services;
      }
      if (updatedData.additionalRequests) {
        booking.additionalRequests = updatedData.additionalRequests;
      }
      if (updatedData.status) {
        booking.status = updatedData.status;
      }
      
      if (updatedData.e_invitation) {
        booking.e_invitation = updatedData.e_invitation;
      }
      if (updatedData.banner) {
        booking.banner = updatedData.banner;
      }
      if (updatedData.eventEndTime) {
        booking.eventEndTime = updatedData.eventEndTime;
      }
      if (updatedData.duration) {
        booking.duration = updatedData.duration;
      }
      
      const updatedBooking = await booking.save();
      return updatedBooking;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async removeById(bookingId: string,updatedData: any) {
    try {
      const booking = await this.bookingModel.findOne({ _id: bookingId });
      if (!booking) {
        throw new HttpException(400, 'ID not Exist');
      }
      if (updatedData.status) {
        booking.status = updatedData.status;
      }
      
      if (updatedData.cancelReason) {
        booking.cancelReason = updatedData.cancelReason;
      }
      const updatedBooking = await booking.save();
      return updatedBooking;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async upComingEvent(userId: string, updatedData: { daysRange: number, eventType?: string }) {
    try {
      const query: any = {
        "userDetails.id": userId,
        status: "BOOKED"
      };
  
      if (updatedData.daysRange === 15) {
        const startTime =Date.now() - 15*( 24 * 60 * 60 * 1000);
        query.eventDate = { $gte: startTime,$lte: new Date() };
      } else if (updatedData.daysRange >15 &&updatedData.daysRange <=30 ){
        const startTime =Date.now() - updatedData.daysRange*( 24 * 60 * 60 * 1000);
        query.eventDate = { $gte: startTime,$lte: new Date() };
      }
  
      if (updatedData.eventType) {
        query['event.type'] = updatedData.eventType;
      }
  
      const events = await this.bookingModel.find(query);
  
      if (!events || events.length === 0) {
        throw new HttpException(400, 'No upcoming events found for the given user ID.');
      }
  
      const response = {
        message: 'Events Fetched Successfully',
        events
      };
  
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async closeEvent(bookingId: string,updatedData: any) {
    try {
      const booking = await this.bookingModel.findOne({ _id: bookingId });
      if (!booking) {
        throw new HttpException(400, 'ID not Exist');
      }
      if (updatedData.status) {
        booking.status = updatedData.status;
      }
      const updatedBooking = await booking.save();
      return updatedBooking;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async cancelledEvent(userId: string, updatedData: { daysRange: number, eventType?: string }) {
    try {
      const query: any = {
        "userDetails.id": userId,
        status: "CANCELLED"
      };
  
      if (updatedData.daysRange === 15 || updatedData.daysRange === 30 || updatedData.daysRange === 60) {
        const currentDate = new Date();
        const startTime = currentDate.getTime() - updatedData.daysRange * 24 * 60 * 60 * 1000;
        
        query.eventDate = {
          $gte: new Date(startTime)
        };
      } else if (updatedData.daysRange > 60) {
        delete query.eventDate; // Remove eventDate filter for more than 60 days
      }
  
      if (updatedData.eventType) {
        query['event.type'] = updatedData.eventType;
      }
  
      const events = await this.bookingModel.find(query);
  
      if (!events || events.length === 0) {
        throw new HttpException(400, 'No completed events found for the given user ID.');
      }
  
      const response = {
        message: 'Completed Events Fetched Successfully',
        events
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async addreviewByBookingid(bookingId: string, updatedData: any) {
    try {
      const booking = await this.bookingModel.findById(bookingId);

      if (!booking) { throw new HttpException(404, 'booking not found') };
      if (updatedData.review) {
        booking.review = updatedData.review;
      }    
    const updatedBooking = await booking.save();
      return updatedBooking;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // public async completedEvent(userId: string, updatedData: { daysRange: number, eventType?: string }) {
  //   try {
  //     const currentDate = new Date()
  //     console.log(currentDate.getTime())
  //     const query: any = {
  //       "userDetails.id": userId,
  //       eventDate: { $lte: currentDate}
  //     };
  //     const updateData: any = {
  //       status: 'COMPLETED'
  //     };
  //     const events = await this.bookingModel.updateMany(query,{ $set: { status: 'COMPLETED' } });
  //     if (updatedData.daysRange === 15 || updatedData.daysRange === 30 || updatedData.daysRange === 60) {
  //       const startTime = currentDate.getTime() - updatedData.daysRange * 24 * 60 * 60 * 1000;
        
  //       query.eventDate = {
  //         $gte: new Date(startTime).toISOString()
  //       };
  //     } else if (updatedData.daysRange > 60) {
  //       delete query.eventDate; 
  //     }
  
  //     if (updatedData.eventType) {
  //       query['event.type'] = updatedData.eventType;
  //     }
  
     
  
  //     if (!events ) {
  //       throw new HttpException(400, 'No completed events found for the given user ID.');
  //     }
  //     const event = await this.bookingModel.find({"userDetails.id": userId, status: 'COMPLETED' });
  
  //     const response = {
  //       message: 'Completed Events Fetched Successfully',
  //       event
  //     };
  
  //     return response;
  //   } catch (err) {
  //     throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  //   }
  // }
  public async completedEvent(userId: string, updatedData: { daysRange: number, eventType?: string }) {
    try {
      const currentDate = new Date();
      const query: any = {
        "userDetails.id": userId,
        eventDate: { $lte: currentDate }
      };
  
      const updateData: any = {
        status: 'COMPLETED'
      };
      const events = await this.bookingModel.updateMany(query, { $set: { status: 'COMPLETED' } });
      if (updatedData.daysRange === 15) {
        const startTime =Date.now() - 15*( 24 * 60 * 60 * 1000);
        query.eventDate = { $gte: startTime,$lte: new Date() };
      } else if (updatedData.daysRange >15 &&updatedData.daysRange <=30 ){
        const startTime =Date.now() - updatedData.daysRange*( 24 * 60 * 60 * 1000);
        query.eventDate = { $gte: startTime,$lte: new Date() };
      }
      if (updatedData.eventType) {
        query['event.type'] = updatedData.eventType;
      }
      const completedEvents = await this.bookingModel.find(query);
  
      if (!completedEvents || completedEvents.length === 0) {
        throw new HttpException(400, 'No completed events found for the given user ID.');
      }
  
      const response = {
        message: 'Completed Events Fetched Successfully',
        events: completedEvents
      };
  
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  
}
