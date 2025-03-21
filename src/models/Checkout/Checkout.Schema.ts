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
  });
const CheckoutShema = new Schema(
  {
    userId: {
      type: String, 
      trim : true,
      required: true,
      
    },
    productDetails:[ ProductDetailsSchema],

    status: {
      type: String, 
      trim : true,
      required: false,
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
    totalAmount:{
      type: Number,
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
    beforeCheckout:{
      type:Boolean,
      default:false
    }
  },
 
  { versionKey: false },
);
CheckoutShema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();

    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }

  next();
});
CheckoutShema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const CheckoutModel = mongoose.model('Checkout', CheckoutShema, 'Checkout');

export  {CheckoutModel};
