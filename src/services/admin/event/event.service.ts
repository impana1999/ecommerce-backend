//import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { EventStatus } from '@/interfaces';
import { HttpException } from '@exceptions/HttpException';
import { EventModel } from '@models/index';
const useTwilioCountry = ['1'];
import bcrypt, { hash } from 'bcryptjs';

export default class EventAuthService {
  private eventModel = EventModel;
  // create a new event 
  public async eventBook(eventInput: {
    name: string;
    imageUrl: string;  
  }) {
    try {
      eventInput['status'] = EventStatus.ACTIVE;
      const newEvent = await (await this.eventModel.create(eventInput)).save();
      const response = {
        newEvent,
      };

      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // Get All  Events
  public async getAllEvents() {
    try {
      const events = await this.eventModel.find().populate('services').exec();
      return events;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // get single event details
  public async getEventById(eventId: string) {
    try {
      const event = await this.eventModel.findById(eventId).populate('services').exec();;

      if (!event) {
        throw new HttpException(404, 'Event not found');
      }
      return event;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async getEventByType(type: string) {
    try {
      const event = await this.eventModel.findOne({ type }).populate('services').exec();

      if (!event) {
        throw new HttpException(404, 'Event not found');
      }
      return event;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  // update the event
  public async updateEventById(eventId: string,updatedEventData : any,) {
    try {
      const event = await this.eventModel.findById(eventId);;

      if (!event) {
        throw new HttpException(400, 'Event not found');
      } else {

        if (updatedEventData.name) {
          event.name = updatedEventData.name;
        }
        if (updatedEventData.imageUrl) {
          event.imageUrl = updatedEventData.imageUrl;
        }
        if (updatedEventData.status) {
          event.status = updatedEventData.status;
        }
        if(updatedEventData.services) {
          //  await this.eventModel.findByIdAndUpdate(eventId,
          //   { $set: {services} },)
          event.services = updatedEventData.services;
       }
          
        console.log(event)
        const updatedEvent = await event.save();
        return updatedEvent;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  // remove the event
  public async removeEventById(eventId: string) {
    try {
      const event = await this.eventModel.findById(eventId);

      if (!event) {
        throw new HttpException(404, 'Event not found');
      }
      await this.eventModel.findByIdAndRemove(eventId);
      const response = {
        message: 'Event data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
