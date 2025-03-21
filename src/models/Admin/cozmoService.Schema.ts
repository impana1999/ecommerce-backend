import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    title: {
      type: String, 
      trim: true,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String, 
      trim: true,
      required: true,
    },
    description: {
      type: String, 
      trim: true,
      required: true,
    },
    createdAt: {
      type: Number,
      required: false
    },
    updatedAt: {
      type: Number,
      required: false,
    },
  },
  { versionKey: false, timestamps: false },
);


ServiceSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

ServiceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const CozmoServiceModel = mongoose.model('CozmoService', ServiceSchema, 'CozmoService');

export { ServiceSchema, CozmoServiceModel };
