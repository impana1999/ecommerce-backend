import { HttpException } from "@/exceptions/HttpException";
import { RatingModel ,BookingModel} from "@/models/index";


// author Vishal
export default class RatingService {
  fetchRatingsByProductId(productId: string) {
    throw new Error('Method not implemented.');
  }
  private ratingModel = RatingModel;
  private BookingModel = BookingModel;

  // author impana 
  // Add product rating API by user
  public async addProductRatingByUser(ratingInput: {
    productId: string;
    eventId: string;
    imageUrl:string;
    userDetails: {
      id: string;
      name: string;
      profilePic: string;
    };
    rating: number;
    review: string;
    likes: number;
    dislikes: number;
    isDeleted: Boolean;
    isHidden: boolean;
    reviewType:string;
  }) {
    try {
      const {
        productId,
        userDetails,
        eventId,
        imageUrl,
        rating,
        review,
        likes,
        dislikes,
        isDeleted,
        isHidden,
        reviewType,
      } = ratingInput;

      const newRating = await (
        await this.ratingModel.create({
          eventId,
          imageUrl,
          productId,
          userDetails,
          rating,
          review,
          likes,
          dislikes,
          isDeleted,
          isHidden,
          reviewType
        })
      ).save();
await this.BookingModel.findOneAndUpdate({_id:eventId,"userDetails.id":ratingInput.userDetails.id},{$set:{"review":true}})

      const response = {
        newRating,
      };
      return response;
    }
    catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong')
    }
  }

  // author impana 
  // Fetch individual rating based on id
  public async fetchproductRatingById(userId: string) {
    try {

      const productRatings = await this.ratingModel.findOne({ 'userDetails.id': userId,reviewType:'PRODUCT'});

      if (!productRatings) {
        throw new HttpException(404, 'No rating found');
      }

      return productRatings;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //   author impana
  // Hide rating by the admin panel
  public async hideRatingByAdminPanel(ratingId: string) {

    try {
      if (!ratingId) {
        throw new HttpException(404, 'No rating found');
      }

      const rating = await this.ratingModel.findByIdAndUpdate({ _id: ratingId }, { $set: { isHidden: true } })

      rating.save();

      return rating;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }

  }

  //   author impana 
  // Soft delete rating by user
  public async softDeleteRatingByUser(userId: string) {

    try {

      const rating = await RatingModel.findOne({ 'userDetails.id': userId });

      if (!rating) {
        throw new HttpException(404, 'No rating found');
      }

      const updatedRating = await RatingModel.findOneAndUpdate(
        { 'userDetails.id': userId },
        { $set: { isDeleted: true } },
        { new: true } 
      );

      return updatedRating;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');

    }

  }
  //   author vishal 
  // List of all product ratings API for panel
  public async getAllratingsByProductId(productId: string) {
    try {

      const ratings = await this.ratingModel.find({ productId,reviewType:'PRODUCT' });

      if (!ratings || ratings.length === 0) {
        console.log(`No rating found for admin with productID: ${productId}`);
        throw new HttpException(404, 'No rating found');
      }

      return ratings;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async fetchEventRatingById(userId: string) {
    try {

      const productRatings = await this.ratingModel.findOne({ 'userDetails.id': userId,reviewType:'EVENT'});

      if (!productRatings) {
        throw new HttpException(404, 'No rating found');
      }

      return productRatings;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  public async getAllratingsByEventId(eventId: string) {
    try {

      const ratings = await this.ratingModel.find({ eventId:eventId,reviewType:'EVENT' });

      if (!ratings || ratings.length === 0) {
        console.log(`No rating found for admin with productID: ${eventId}`);
        throw new HttpException(404, 'No rating found');
      }

      return ratings;

    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async totalRate(productId: string) {
    try {
      const ratings = await this.ratingModel.find({ productId: productId });
  
      if (!ratings || ratings.length === 0) {
        throw new HttpException(404, 'No rating found');
      }
  
      let totalNumberRatings = 0;
      let totalNumberReviews = 0;
      let ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      };
  
      ratings.forEach((rating) => {
        if (rating.rating !== undefined && !isNaN(rating.rating)) {
          totalNumberRatings += rating.rating;
  
          // Count individual ratings
          const roundedRating = Math.round(rating.rating);
          if (roundedRating >= 1 && roundedRating <= 5) {
            ratingCounts[roundedRating]++;
          }
        }
        if (rating.review && rating.review.trim() !== '') {
          totalNumberReviews++;
        }
      });
      const averageRating = totalNumberRatings / ratings.length;
      return { totalNumberRatings, totalNumberReviews,averageRating, ratingCounts};
  
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async geteventrating() {
    try {
      const ratings = await this.ratingModel.find({ reviewType: "EVENT" });
  
      if (!ratings || ratings.length === 0) {
        console.log('No ratings found for events');
        throw new HttpException(404, 'No ratings found');
      }
  
      const eventIds = ratings.map(event => event.eventId); // Extract eventIds from ratings
  console.log(eventIds)
      // Fetch event details from BookingModel using eventIds
      const eventsInBooking = await this.BookingModel.find({ _id: { $in: eventIds } },{_id:1,event:1});
  
      const response = ratings.map(event => {
        const eventDetails = eventsInBooking.find(bookingEvent => bookingEvent._id.toString() === event.eventId.toString());
        console.log("dats",eventDetails)
        return {
          ...event.toObject(), // Convert Mongoose document to a plain JS object
          eventDetails: eventDetails ? eventDetails.toObject() : null, // Include event details or null if not found
        };
      });
  
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err.message || 'Something went wrong');
    }
  }
  public async deleterating(Id:string) {
    try {
      const ratings = await this.ratingModel.findOneAndDelete({ _id:Id});
      if (!ratings) {
        throw new HttpException(400, 'ID not Exist');
      }
      await this.ratingModel.findByIdAndRemove(Id);
      const response = {
        message: 'rating data removed successfully from database',
        ratings
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err.message || 'Something went wrong');
    }
  }
  public async likeRating(ratingId: string, likerData:{id:string}) {
    try {
      const existingRating = await this.ratingModel.findOne({ _id: ratingId });
  
      if (!existingRating) {
        throw new HttpException(404, 'No rating found');
      }
  
      const userLikedIndex = await this.ratingModel.findOne({
        _id: ratingId,
        "likerDetails.id": likerData.id,
        "likerDetails.isliked": true
      });
  
      if (userLikedIndex) {
        throw new HttpException(400, 'Already Liked ');
      }
  
      const updatedRating = await this.ratingModel.findOneAndUpdate(
        { _id: ratingId, "likerDetails.id": { $ne: likerData.id } },
        {
          $inc: { likes: 1 },
          $push: {
            likerDetails: {
              id: likerData.id,
              isliked: true
            }
          }
        },
        { new: true }
      );
      await this.ratingModel.findOneAndUpdate(
        { _id: ratingId, "likerDetails.id": { $ne: likerData.id } },
        {
          $inc: { dislikes: -1 },
          $pull: {
            likerDetails: {
              id: likerData.id,
              isdisliked: true
            }
          }
        },
        { new: true }
      );
  
      if (!updatedRating) {
        throw new HttpException(404, 'Undislike first to like');
      }
  
      const ratings = await this.ratingModel.findOne({ _id: ratingId });
      return ratings;
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Something went wrong'
      );
    }
  }
  public async dislikeRating(ratingId: string, likerData: any) {
    try {
      const existingRating = await this.ratingModel.findOne({ _id: ratingId });
  
      if (!existingRating) {
        throw new HttpException(404, 'No rating found');
      }
      const userDislikedIndex = await this.ratingModel.findOne({
        _id: ratingId,
        "likerDetails.id": likerData.id,
        "likerDetails.isdisliked": true
      });
  
      if (userDislikedIndex) {
        throw new HttpException(400, 'Already Disliked');
      }
  
      const updatedRating = await this.ratingModel.findOneAndUpdate(
        { _id: ratingId },
        {
          $inc: { dislikes: 1 }, 
          $push: {
            likerDetails: {
              id: likerData.id,
              isdisliked: true
            }
          },
        },
        { new: true }
      );
       await this.ratingModel.findOneAndUpdate(
        { _id: ratingId },
        {
          $inc: { likes: -1 }, 
          $pull: {
            likerDetails: {
              id: likerData.id,
              isliked: true
            }
          }
        },
        { new: true }
      );
      if (!updatedRating) {
        throw new HttpException(404, 'Unlike first to Dislike');
      }
      const ratings = await this.ratingModel.findOne({ _id: ratingId });
      return ratings;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async unlikeRating(ratingId: string, likerData: any) {
    try {
      const ratings = await this.ratingModel.findOneAndUpdate(
        { 
          _id: ratingId,
          "likerDetails.id": likerData.id,
          "likerDetails.isliked": true
        },
        {
          $inc: { likes: -1 },
          $pull: {
            likerDetails: {
              id: likerData.id,
              isliked: true
            }
          }
        },
        { new: true }
      );
  
      if (!ratings) {
        throw new HttpException(404, 'No rating found');
      }
  
      return ratings;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async undislikeRating(ratingId: string,likerData) {
    try {
      const ratings = await this.ratingModel.findOneAndUpdate(
        { 
          _id: ratingId,
          "likerDetails.id": likerData.id,
          "likerDetails.isdisliked": true
        },
        {
          $inc: { dislikes: -1 },
          $pull: {
            likerDetails: {
              id: likerData.id,
              isdisliked: true
            }
          }
        },
        { new: true }
      );
  
      if (!ratings) {
        throw new HttpException(404, 'No rating found');
      }

      return ratings;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  
  
  
}