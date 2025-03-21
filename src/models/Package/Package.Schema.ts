// import { GAMES } from '@/interfaces';
import { GAMES } from '@/interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  hour: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    trim: true,
    required: true
  },
}, { _id: false });     // Does not create '_id' for nested object 

const LocationSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  }
}, { _id: false });     // Does not create '_id' for nested object 

const FeatureSchema = new Schema({
  game: {
    type: String,
    required: true
  },
  location: {
    type: LocationSchema,
    required: true
  },
  days: {
    type: String,
    trim: true,
    required: true
  },
  timeRange: {
    type: String,
    trim: true,
    required: true,
  },
  prices: [PriceSchema]
}, { _id: false });     // Does not create '_id' for nested object 

const AddOnsSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: true
  },
  amount: {
    type: Number,
    trim: true,
    required: true
  }
})    // Does not create '_id' for nested object 


const ActivitySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});


const PackageSchema = new Schema(
  {
    // Common fields across event types
    title: {
      type: String,
      trim: true,
      required: true,
    },
    eventType: {
      type: String,
      trim: true,
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      required: false,
    },
    amount: {
      type: Number,
     // required: true,
    },
    locations: {
      type: [LocationSchema],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    description: {
      type: Array,
      trim: true,
      required: true,
    },

    // Birthday events fields
    subTitle: {
      type: String,
      trim: true,
      required: false,
    },
    activities: {
      type: String,
      trim: true,
      required: false,
    },
    activityDetails: {
      type: [ActivitySchema],
      required: false,
    },
    addOns: {
      type: [AddOnsSchema],
      required: false,
    },
    peopleIncluded: {
      type: Number,
      required: false,
    },

    // Corporate event fields
    features: {
      type: [FeatureSchema],
      required: false,
    },

    // Gamge event fields
    duration: {
      type: Number,
      required: false
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

PackageSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

PackageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const PackageModel = mongoose.model('Package', PackageSchema, 'packages');

export default PackageModel;
