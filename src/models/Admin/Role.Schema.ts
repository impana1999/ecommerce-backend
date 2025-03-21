import mongoose from "mongoose";


const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String, 
    trim : true,
    required: true,
  },
  permissions: {
    type: [{
      name: {
        type: String, 
        trim : true,
        required: true,
      },
      type: {
        type: String, 
        trim : true,
        required: true,
      },
      value: {
        type: [],
        required: true,
      }
    }
    ],
    required: false

  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Number,
    required: false,
  },

  updatedAt: {
    type: Number,
    required: false,
  },
})

RoleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

RoleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const RoleModel = mongoose.model('role', RoleSchema, 'roles');

export default RoleModel;
