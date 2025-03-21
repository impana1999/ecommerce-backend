import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const AdminTokenSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      // ref: 'Admin',
      required: true,
      unique: true,
    },
    accessToken: {
      type: String, 
      trim : true,
    },
    refreshToken: {
      type: String, 
      trim : true,
    },
  },

  { versionKey: false },
);

AdminTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const AdminTokenSchemaModel = mongoose.model('AdminToken', AdminTokenSchema, 'admintokens');

export { AdminTokenSchemaModel };
