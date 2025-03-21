import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    userId:{
      type: String, 
      trim : true,
      required: true,
    },
    name: {
      type: String, 
      trim : true,
      required: true,
    },
    address: {
      type: String, 
      trim : true,
      required: true,
    },
    city: {
      type: String, 
      trim : true,
      required: true,
    },
    state: {
      type: String, 
      trim : true,
      required: true,
    },
    country: {
      type: String, 
      trim : true,
      required: true,
    },
    zipCode: {
      type: String, 
      trim : true,
      required: true,
    },
    coordinates: {
      type: {
        lat: {
          type: String, 
          trim : true,
          required: true,
        },
        long: {
          type: String, 
          trim : true,
          required: true,
        },
      },
      required: true,

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
  { versionKey: false },
);
AddressSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});
AddressSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const AddressModel = mongoose.model('Address', AddressSchema, 'Address');

export { AddressModel, AddressSchema };
