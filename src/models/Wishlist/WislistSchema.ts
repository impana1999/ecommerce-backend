import mongoose from 'mongoose';

import { features } from 'process';

const Schema = mongoose.Schema;
const wishlistSchema = new Schema(
  {
    userId: {
      type: String, 
      trim : true,
      required: true,
    },
    productDetails: {
      id: {
        type: String, 
        trim : true,
        required: true,
      },
      name: {
        type: String, 
        trim : true,
        required: true,
      },
      imageUrl: {
        type: String, 
        trim : true,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    isinCart: {
      type: Boolean, 
      required: false,
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

wishlistSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();

    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }

  next();
});

wishlistSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const wishlistModel = mongoose.model('wishlist', wishlistSchema, 'wishlist');

export { wishlistModel, wishlistSchema };
