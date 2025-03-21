import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    accessToken: {
        type: String, 
        trim : true,
        required: false
    },
    refreshToken: {
        type: String, 
        trim : true,
        required: false
    },
    accessExpiryTime: {
        type: String, 
        trim : true,
        required: false
    },
    refreshExpiryTime: {
        type: String, 
        trim : true,
        required: false
    }
}, { versionKey: false });

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
  });

const TokenModel = mongoose.model('Token', UserSchema, 'tokens');

export default TokenModel;