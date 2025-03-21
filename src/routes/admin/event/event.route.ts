import { Router } from 'express';
import { EventAuthController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { EventBookDto,EventUpdateDto } from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AdminEventRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public eventAuthController = new EventAuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/add-event', validationMiddleware(EventBookDto, 'body'),
    authMiddleware,
     this.eventAuthController.eventbook)
    this.router.get(this.path + '/events',
    authMiddleware,  
    this.eventAuthController.getallevents);
    this.router.get(this.path + '/event/:eventId',
    authMiddleware, 
    this.eventAuthController.geteventbyid);
    this.router.get(this.path + '/event-by-type/:type',
    authMiddleware, 
    this.eventAuthController.getEventByType);
    this.router.post(this.path + '/update-event/:eventId', validationMiddleware(EventUpdateDto, 'body'),authMiddleware, this.eventAuthController.updatevventbyid)
    this.router.delete(this.path + '/delete-event/:eventId',authMiddleware, this.eventAuthController.removeeventbyid)

  }
}
export default AdminEventRoute;
