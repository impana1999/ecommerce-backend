import formatRelativeWithOptions from 'date-fns/fp/formatRelativeWithOptions/index.js';
import mongoose from 'mongoose';

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
    required: false
  }
});

const ProductDetailsSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  imageUrl: {
    type: String,
    trim: true,
    required: true,
  },
  quantity:{
    type: Number, 
    trim : true,
  },
  availability: {
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
});
const UserShortSchema = new Schema({
  id: {
      type: String, 
      trim : true,
  },
  name: {
      type: String, 
      trim : true,
  },
  profile_img:{
    type: String, 
      trim : true,
  }
}, { _id: false }); 
const OrderSchema = new Schema(
  {
    orderType:{
      type: String, 
      trim : true,
    },
    userDetails: {
      type: UserShortSchema,
      required: true,
  },
    productDetails:[ ProductDetailsSchema],
   eventId: {
      type: String, 
      trim : true,
    },
    tournamentId:{
      type: String, 
      trim : true,
    },
    pickuplocation:{
      branchId:String,
      name:String,
      address:String,
      city:String,
      state:String,
      country:String,
      imageUrl:String,
      zipCode:String,
    },
    diliverLocation:{
      AddressId:String,
      name:String,
      address:String,
      city:String,
      state:String,
      country:String,
      imageUrl:String,
      zipCode:String,
    },
    amount: {
      type: Number, 
      trim : true,
    },
    currency: {
      type: String, 
      trim : true,
    },
    receipt: {
      type: String, 
      trim : true,
    },
    customerId: {
      type: String, 
      trim : true,
    },
    orderId: {
      type: String, 
      trim : true,
    },
    amountPaid: {
      type: String, 
      trim : true,
    },
    amount_due: {
          type: String, 
          trim : true,
          required: true,
        },
    status: {
      type: String, 
      trim : true,
      required: true,
    },
    razorpay_payment_id:{
      type: String, 
      trim : true,
    },
    razorpay_signature:{
      type: String, 
      trim : true,
    },
    isOrdered:{
      type:Boolean, 
      default : true,
    },
    isCancelled:{
      type:Boolean, 
      default : false,
    },
    qrCode:{
      type: String, 
      trim : true,
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
  { versionKey: false },
);
OrderSchema.pre('save', function (next) {
  if (this.isNew) {
      this.createdAt = Date.now();
      this.updatedAt = Date.now();
  } else {
      this.updatedAt = Date.now();
  }
  next();
});
OrderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const OrderModel = mongoose.model('orders', OrderSchema, 'orders');

export  {OrderModel};
