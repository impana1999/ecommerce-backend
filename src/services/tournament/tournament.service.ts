import { HttpException } from "@/exceptions/HttpException";
import { TournamentModel,OrderModel} from "@/models/index";


// author Vishal
export default class TournamentService {
  fetchRatingsByProductId(productId: string) {
    throw new Error('Method not implemented.');
  }
  private TournamentModel = TournamentModel;
  private OrderModel = OrderModel;
  // author impana 
  // Add product rating API by user
  public async createTournament(Input: {
    title :string, 
    description :string, 
    imageUrl  :string, 
    totalEntries :number,
    date :number,
    time:number
    totalAmount :number,
  }) {
    try {
      const {
        title,
        description,
        imageUrl,
        totalEntries,
        date,
        time,
        totalAmount,
      } = Input;

      const newtournament= await (
        await this.TournamentModel.create({
          title,
        description,
        imageUrl,
        totalEntries,
        date,
        time,
        totalAmount,
        totalEntriesLeft:Input.totalEntries
        })
      ).save();

      const response = {
        newtournament,
      };
      return response;
    }
    catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong')
    }
  }

  // author impana 
  // Fetch individual rating based on id
  public async getAllTournament() {
    try {

      const AllTournament = await this.TournamentModel.find();

      if (!AllTournament) {
        throw new HttpException(404, 'No Tournament found');
      }

      return AllTournament;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async getTournamentById(tournamentId: string,Input:any) {
    try {
      const allTournaments = await this.TournamentModel.findOne({_id:tournamentId});
  
      if (!allTournaments ) {
        throw new HttpException(404, 'No Tournament found');
      }
  
      const orderForUser  = await this.OrderModel.findOne({userId:Input.userId, tournamentId:allTournaments._id,isOrdered:true});
  
      const response = {
        ...allTournaments.toObject(),
        hasOrder: !!orderForUser, // Indicates if the user has an order for this tournament
      };
  
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  //   author impana
  // Hide rating by the admin panel
  public async getTournament(id: string) {
    try {
      const tournament = await this.TournamentModel.findOne({ _id: id})
      if (!tournament) {
        throw new HttpException(404, 'No Tournament found');
      }
      return tournament;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }

  }

  //   author impana 
  // Soft delete rating by user
  public async updateTournament(id: string,updatedData:any) {

    try {

      const tournament = await this.TournamentModel.findOne({_id:id})

      if (!tournament) {
        console.log(`No Items found }`);
        throw new HttpException(404, 'No Items found');
      } else {
        if (updatedData.title) {
          tournament.title = updatedData.title;
        }
        if (updatedData.description) {
          tournament.description = updatedData.description;
        }
        if (updatedData.imageUrl) {
          tournament.imageUrl = updatedData.imageUrl;
        }
        if (updatedData.totalEntries) {
          tournament.totalEntries = updatedData.totalEntries;
        }
        if (updatedData.date) {
          tournament.date = updatedData.date;
        }
        if (updatedData.time) {
          tournament.time = updatedData.time;
        }
        if (updatedData.totalAmount) {
          tournament.totalAmount = updatedData.totalAmount;
        }
      }
      const tournaments = await tournament.save();
      return tournament;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }

  }

  //   author vishal 
  // List of all product ratings API for panel
  public async removeTournament(id: string) {
    try {
      const tournament = await this.TournamentModel.findOneAndDelete({ _id: id });
      if (!tournament) {
        throw new HttpException(400, 'ID not Exist');
      }
      await this.TournamentModel.findByIdAndRemove(id);
      const response = {
        message: 'Tournament data removed successfully from database',
        tournament
      };
      return response;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  } 
  public async highlights() {
    try {
      const currentDate = new Date(); // Your current date
    const oneWeekAfter = new Date(currentDate);
    oneWeekAfter.setDate(currentDate.getDate() + 7); // Get date 7 days after the current date

    const tournament = await this.TournamentModel.find({
      date: { $gte: currentDate, $lte: oneWeekAfter } // Query data within the upcoming 7 days
    });
  
      if (!tournament || tournament.length === 0) {
        throw new HttpException(400, 'No data found for the specified period');
      }
  
      const response = {
        message: 'Tournament data fetched successfully from the specified period',
        tournament
      };
      return response;
  
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async upComingTournament() {
    try {
      const currentDate = new Date();

    const tournament = await this.TournamentModel.find({date: { $gte: currentDate } });
  
      if (!tournament || tournament.length === 0) {
        throw new HttpException(400, 'No data found for the specified period');
      }
  
      const response = {
        message: 'Tournament data fetched successfully from the specified period',
        tournament
      };
      return response;
  
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  
}