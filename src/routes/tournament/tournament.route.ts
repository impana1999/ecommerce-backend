import { Router } from 'express';

import { Routes } from '@interfaces/index';
import { authMiddleware, authTempMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { TournamentController } from '@/controllers';
import {tournamentDto} from '@dtos/index'

class tournamentRoute implements Routes{
    public path = '/tournament';
    public router = Router();
    public TournamentController = new TournamentController();

    constructor() {
        this.initializeRoutes();
      }
      private initializeRoutes(){
        this.router.post(this.path + '/create', authMiddleware,validationMiddleware(tournamentDto,'body'), this.TournamentController.createTournament);

        this.router.get(this.path + '/get-all-tournament', authMiddleware, this.TournamentController.getAllTournament);

        this.router.get(this.path + '/get-tournament/:id',authMiddleware,this.TournamentController.getTournament);

        this.router.post(this.path + '/update-tournament/:id',authMiddleware,this.TournamentController.updateTournament);

        this.router.delete(this.path + '/remove-tournament/:id', authMiddleware, this.TournamentController.removeTournament);

        this.router.post(this.path + '/highlights-tournament', authMiddleware, this.TournamentController.highlights)

        this.router.post(this.path + '/get-tournament/:tournamentId', authMiddleware, this.TournamentController.getTournamentById)

        this.router.get(this.path + '/upcoming-tournament', authMiddleware, this.TournamentController.upComingTournament)
        

        
      }

}

export default tournamentRoute;