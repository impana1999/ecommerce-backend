import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    title: {
      type: String, 
      trim : true,
      required: true,
    },
    text: {
      type: String, 
      trim : true,
      required: true,
    },
    subText: {
      type: String, 
      trim : true,
      required: true,
    },
    imageUrl: {
      type: String, 
      trim : true,
      required: true,
    },
    description: {
      type: String, 
      trim : true,
      required: true
    },
    expiryDate: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
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
    status: {
      type: String, 
      trim : true,        //enum
      required: true,
    },

  },
  { versionKey: false, timestamps: false },
);
BannerSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

BannerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const BannerModel = mongoose.model('Banner', BannerSchema, 'banners');

export default BannerModel;
