import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
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
    isActive: {
        type: Boolean,
        required: true,
    },
  },
 
  { versionKey: false },
);

CategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const CategoryModel = mongoose.model('Category', CategorySchema, 'categories');

export default CategoryModel;
