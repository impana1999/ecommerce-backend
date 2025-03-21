import { ArrayMaxSize } from 'class-validator';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema({
  id: {
    type: String, trim : true,
    required: true,
  },
  name: {
    type: String, 
    trim : true,
    required: true,
  },
  profilePic: {
    type: String, 
    trim : true,
    required: true,
  },
});
const likerSchema=new Schema({
  id: {
    type: String, trim : true,
    required: true,
  }, 
  isliked: {
    type: Boolean,
    default: false,
  },
  isdisliked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
})
const RatingSchema = new Schema(
  {
    productId: {
      type: String, 
      trim : true,
      required: false,
    },
    eventId: {
      type: String, 
      trim : true,
      required: false,
    },
    imageUrl:{
      type: String, 
      trim : true,
      required: false,
    },
    userDetails: {
      type: UserDetailsSchema,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String, 
      trim : true,
      required: false,
    },
    likes: {
      type: Number,
      required: false,
    },
    dislikes: {
      type: Number,
      required: false,
    },
    likerDetails:[likerSchema],
    reviewType:{
      type: String, 
      trim : true,
      required: true,
    },
    createdAt: {
      type: Number,
      required: false,
    },
    updatedAt: {
      type: Number,
      required: false,
    },
  },
  { versionKey: false, timestamps: false },
);
RatingSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

RatingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const RatingModel = mongoose.model('Rating', RatingSchema, 'ratings');

export { RatingModel, RatingSchema };
