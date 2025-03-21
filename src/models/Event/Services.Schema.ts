import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ServicesSchema = new Schema(
  {
    name: {
      type: String, 
      trim : true,
      required: false,
    },
    imageUrl: {
      type: String, 
      trim : true,
      required: false,
    },
    type: {
      type: String, 
      trim : true,
      required: false,
    },
    details: [
      {
        label: String,
        imageUrl: String,
        description: String,
        amount: String,
        mealType: String
      },
    ],
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

ServicesSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

ServicesSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const ServiceModel = mongoose.model('EventService', ServicesSchema, 'event_services');

export default ServiceModel;
