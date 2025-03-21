import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FaqSchema = new Schema(
  {
   question:{
    type: String, 
    required: false,
   },
   answer:{
    type: String, 
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
  },
  { versionKey: false },
);

FaqSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});
FaqSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});
const FaqModel = mongoose.model('FAQ', FaqSchema, 'FAQ');

export {FaqModel};
