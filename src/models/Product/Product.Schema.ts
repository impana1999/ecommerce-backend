import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProdcutSchema = new Schema(
  {
    name: {
      type: String, 
      trim : true,
      required: true,
    },
    imageUrl: {
      type: Array, 
      trim : true,
      required: true,
    },
    description: {
      type: String, 
      trim : true,
      required: true,
    },
    price: {
      type: String, 
      trim : true,
      required: true,
    },
    daysToReturn: {
      type: Number,
      required: true,
    },
    availability: {
      type: Number, 
      trim : true,
      required: true,
    },
    features: {
      type: [],
      required: true,
    },
    subCategories : {
      type : [],
      required : true
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
ProdcutSchema.pre('save', function (next) {
  if (this.isNew) {
      this.createdAt = Date.now();
      this.updatedAt = Date.now();
  } else {
      this.updatedAt = Date.now();
  }
  next();
});
ProdcutSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const ProductModel = mongoose.model('Product', ProdcutSchema, 'products');

export default ProductModel;
