import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const EventSchema = new Schema(
  {
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
    status: {
      type: String, 
      trim : true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true
    },
    services : {
      type : [
        {
          type: Schema.Types.ObjectId,
          ref: 'EventService',
        },
      ],// objectId of features model
      required : false
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

EventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

EventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});


const EventModel = mongoose.model('Event', EventSchema, 'events');

export default EventModel;
