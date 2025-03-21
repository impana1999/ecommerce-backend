import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LocationSchema = new Schema(
  {


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
    imageUrl: {
      type: String, 
      trim : true,
      required: true,
    },
    branchCode: {
      type: String, 
      trim : true,
      required: false,

    },
    branchManager: {
      type: {
        id: {
          type: String, 
          trim : true,
        },

        name: {
          type: String, 
          trim : true,
        },
        email: {
          type: String, 
          trim : true,
        },
        profilePictureUrl: {
          typr: String,
        },
        role: {
          type: String, 
          trim : true,
        },
      },
      required: false,
    },

    status: {
      type: String, 
      trim : true,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,

    },
    services: {
      type: [],
      required: false
    },

  },
  { versionKey: false },
);

LocationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const LocationModel = mongoose.model('Location', LocationSchema, 'location');

export default LocationModel;
