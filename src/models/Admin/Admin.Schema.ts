import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    email: {
      type: String, 
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String, 
      trim: true,
      required: true,
    },
    countryCode: {
      type: String, 
      trim: true,
      required: true,
    },
    mobileNumber: {
      type: String, 
      trim: true,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
      required: false,
    },
    firstName: {
      type: String, 
      trim: true,
      required: true
    },
    lastName: {
      type: String, 
      trim: true,
      required: true
    },
    role: {
      type: String, 
      trim: true,
      required: true
    },
    status: {
      type: String, 
      trim: true,
      required: false,
    },
    emailOtp: {
      type: Number,
      required: false,
    },
    userType: {
      type: String, 
      trim: true,
      required: false
    },
    isLoggedIn: {
      type: Boolean,
      required: false,
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


AdminSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

AdminSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const AdminModel = mongoose.model('Admin', AdminSchema, 'admins');

export { AdminSchema, AdminModel };
