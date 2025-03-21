import { Router } from 'express';
import { BookingController } from '@controllers/index';
import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import { BookingDto, UpdateBookingDto } from '@/dtos/index';
import validationMiddleware from '@middlewares/validation.middleware';

class BookingRoute implements Routes {
  public path = '/booking';
  public router = Router();
  public bookingController = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create', authMiddleware, validationMiddleware(BookingDto, 'body'), this.bookingController.createBooking);

    this.router.get(this.path + '/get-user-bookings', authMiddleware, this.bookingController.getallBookingsByUserId);

    this.router.get(this.path + '/details/:id', authMiddleware, this.bookingController.getBookingDetails);

    this.router.post(
      this.path + '/update/:id',
      validationMiddleware(UpdateBookingDto, 'body'),
      authMiddleware,
      this.bookingController.updateBooking,
    );

    this.router.post(this.path + '/cancel-booking/:bookingId', authMiddleware, this.bookingController.removeBookingbyid);

    this.router.post(this.path + '/upcoming-events/:id', authMiddleware, this.bookingController.upcomingevent)
    this.router.post(this.path + '/completed-events/:id', authMiddleware, this.bookingController.completedevent)
    
    this.router.post(this.path + '/close-events/:bookingId', authMiddleware, this.bookingController.closeevent)
    this.router.post(this.path + '/cancelled-events/:id', authMiddleware, this.bookingController.cancelledevent)
    this.router.post(this.path + '/add-review/:bookingId', authMiddleware, this.bookingController.addreviewbybookingid)
  }
}

export default BookingRoute;
