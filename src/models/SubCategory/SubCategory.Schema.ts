import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
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
    categoryIds : {
        type : [],
        required : true
    }
  },
 
  { versionKey: false },
);

SubCategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const SubCategoryModel = mongoose.model('SubCategory', SubCategorySchema, 'sub_categories');

export default SubCategoryModel;
