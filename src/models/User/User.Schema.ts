import { UserStatus } from '@/interfaces';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        trim : true,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        trim : true,
        required: true
    },
    firstName: {
        type: String, 
        trim : true,
        required: false
    },
    lastName: {
        type: String, 
        trim : true,
        required: false
    },
    countryCode: {
        type: String, 
        trim : true,
        required: true,
    },
    mobileNumber: {
        type: String, 
        trim : true,
        required: true,
        unique: true
    },
    nationality: {
        type: String, 
        trim : true,
        required: true,
    },
    otp: {
        type: Number,
        required: false,
    },
    emailOtp: {
        type: Number,
        required: false,
    },
    mobileNumberOtp:{
        type: Number,
        required: false,
    },
    status: {
        type: String, 
        trim : true,
        required: false,
    },
    isLoggedIn: {
        type: Boolean,
        required: false,
    },
    gender: {
        type: String, 
        trim : true,
        required: false
    },
    dateOfBirth: {
        type: String, 
        trim : true,   // DD-MM-YYYY
        required: false
    },
    proBowler: {
        type: Boolean,
        required: false
    },
    profilePicture: {
        type: String, 
        trim : true,
        required: false
    },
    userType: {
        type: String, 
        trim : true,
        required: false
    },
    socials: {
        type: [],
        required: false
    },
    points: {
        type: Number,
        required: false
    },
    pointLevel: {
        type: String, 
        trim : true,   // Starter || Striker || VIP
        required: false,
    },
    customerId: {
        type: String, 
        required: false,
    },

}, { versionKey: false });


UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }

});

const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;
