import { TournamentService } from '@services/index';
import catchAsync from "@/utils/async";
import { Request, Response } from 'express';
import * as ApiResponse from '@utils/ApiResponse';

export default class TournamentController{
    private TournamentService=new TournamentService();
/**
   *
   * @desc        Save / Update AppData
   * @route       GET api/v1/app/meat
   * @access      Private
   * @returns     Returns Successful Message
   */

public createTournament = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const rating = await this.TournamentService.createTournament(req.body);
    ApiResponse.successResponseWithData(res, "Tournament created successfully", rating);
  });

  public getAllTournament = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.TournamentService.getAllTournament();
    ApiResponse.successResponseWithData(res, 'Get Tournament successfully', data);
  });
  public getTournamentById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const tournamentId=req.params.tournamentId
    const data = await this.TournamentService.getTournamentById(tournamentId,req.body);
    ApiResponse.successResponseWithData(res, 'Get Tournament successfully', data);
  });
  
  public getTournament = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = await this.TournamentService.getTournament(id);
    ApiResponse.successResponseWithData(res, 'Tournament data fetched by id Successfully', updatedData);
  })
  public updateTournament = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const data = await this.TournamentService.updateTournament(id,req.body);
    ApiResponse.successResponseWithData(res, 'Tournament updated by id Successfully',data);
  });

  public removeTournament = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const data = await this.TournamentService.removeTournament(id);
    ApiResponse.successResponseWithData(res, 'Tournament removed successfully', data);
  });
  public highlights = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.TournamentService.highlights();
    ApiResponse.successResponseWithData(res, 'highlights found successfully', data);
  });
  public upComingTournament = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const data = await this.TournamentService.upComingTournament();
    ApiResponse.successResponseWithData(res, 'Tournament removed successfully', data);
  });
  
}