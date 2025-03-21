import { Request, Response } from 'express';
import { EventAuthService } from '@services/admin/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';
import { HttpException } from '@exceptions/HttpException';

export default class EventAuthController {
  private eventAuthService = new EventAuthService();

  public eventbook = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bookingData = await this.eventAuthService.eventBook(req.body);
    ApiResponse.successResponseWithData(res, 'Event Booked Successfully', bookingData);
  });

  public getallevents = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.eventAuthService.getAllEvents();

      ApiResponse.successResponseWithData(res, 'Getting All Booked Events', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public geteventbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.eventId;

      const data = await this.eventAuthService.getEventById(eventId);

      ApiResponse.successResponseWithData(res, 'Get Single  Event', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });


  public getEventByType = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const type = req.params.type;
      const data = await this.eventAuthService.getEventByType(type);

      ApiResponse.successResponseWithData(res, 'Event fetched successfully', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });


  public updatevventbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.eventId;
//const { services,name, imageUrl,status } = req.body;

      const data = await this.eventAuthService.updateEventById(eventId, req.body);


      ApiResponse.successResponseWithData(res, 'Successfully updated Event', data);
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });

  public removeeventbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    try {
      const eventId = req.params.eventId;

      await this.eventAuthService.removeEventById(eventId);

      ApiResponse.successResponse(res, 'Event Removed Successfully');
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  });
}
