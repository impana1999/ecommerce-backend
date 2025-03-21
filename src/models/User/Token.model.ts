import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

const TokenModel = mongoose.model('Token', TokenSchema, 'tokens');

export default TokenModel;
