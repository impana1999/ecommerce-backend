import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HomeSchema = new Schema(
  {
   
 
  },
  { versionKey: false },
);

HomeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const HomeModel = mongoose.model('Home', HomeSchema, 'home');

export default HomeModel;
