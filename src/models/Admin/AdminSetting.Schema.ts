import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminSettingSchema = new Schema(
  {
    type: {
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


AdminSettingSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

AdminSettingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const AdminSettingModel = mongoose.model('Adminsettinf', AdminSettingSchema, 'Adminsetting');

export { AdminSettingSchema, AdminSettingModel };
