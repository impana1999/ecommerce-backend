import mongoose from 'mongoose';

import { features } from 'process';

const Schema = mongoose.Schema;

const featureSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  type: {
    type: [],
    required: false
  },
  unit:{
    type: String,
    required:false
  }
});
const CartSchema = new Schema(
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
      specifications: {
        type: [
          {
            feature: [featureSchema],
            selected: {
              type: String, 
              trim : true,
              required: true,
            },
            unit: {
              type: String, 
              trim : true,
              required: true,
            },
          },
        ],
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      availability:{
        type: Number,
        required: true,
      }
    },
   
    iswishlist: {
      type: Boolean,
      default:false,
    },
    status: {
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

CartSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();

    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }

  next();
});

CartSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const CartModel = mongoose.model('Cart', CartSchema, 'cart');

export { CartModel, CartSchema };
