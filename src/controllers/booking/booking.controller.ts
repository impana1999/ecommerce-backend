import { Request, Response } from 'express';
import { BookingService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';

export default class BookingController {
  private bookingService = new BookingService();

  /**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */
  public createBooking = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const booking = await this.bookingService.createBooking(req.user.id, req.body);
    ApiResponse.successResponseWithData(res, "Booking created successfully", booking);
  });

  public getallBookingsByUserId = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.bookingService.getAllBookingsByUserId(req.user.id);
    ApiResponse.successResponseWithData(res, 'Get all bookings by user id successfully', data);
  });

  public getBookingDetails = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.bookingService.getBookingDetails(req.params.id);
    ApiResponse.successResponseWithData(res, 'Get booking by booking id successfully', data);
  });

  public updateBooking = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const updatedData = await this.bookingService.updateBooking(req.params.id, req.body);
    ApiResponse.successResponseWithData(res, 'Booking data updated Successfully', updatedData);
  });

  public removeBookingbyid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bookingId = req.params.bookingId;
    const data = await this.bookingService.removeById(bookingId,req.body);
    ApiResponse.successResponseWithData(res, 'Booking Cancelled Successfully',data);
  });
  
  public upcomingevent = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const data = await this.bookingService.upComingEvent(userId,req.body);
    ApiResponse.successResponseWithData(res, 'Events Fetched Successfully',data);
  });
  
  public completedevent = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const data = await this.bookingService.completedEvent(userId,req.body);
    ApiResponse.successResponseWithData(res, 'Events Fetched Successfully',data);
  });
  
  public closeevent = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bookingId = req.params.bookingId;
    const data = await this.bookingService.closeEvent(bookingId,req.body);
    ApiResponse.successResponseWithData(res, 'Booking completed Successfully',data);
  });
  public cancelledevent = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const data = await this.bookingService.cancelledEvent(userId,req.body);
    ApiResponse.successResponseWithData(res, 'Cancelled Event Fetched Successfully',data);
  });
  public addreviewbybookingid = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bookingId = req.params.bookingId;
    const data = await this.bookingService.addreviewByBookingid(bookingId,req.body);
    ApiResponse.successResponseWithData(res, 'Booking completed Successfully',data);
  });
  
  
}
