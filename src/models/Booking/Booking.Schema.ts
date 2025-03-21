import { BookingStatus } from '@/interfaces/index';
import formatRelativeWithOptions from 'date-fns/esm/fp/formatRelativeWithOptions';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    id: {
        type: String, 
        trim : true,
        required: true
    },
    name: {
        type: String, 
        trim : true,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { _id: false });     // Does not create '_id' for nested object 

const BranchSchema = new Schema({
    id: {
        type: String, 
        trim : true,
        required: true
    },
    name: {
        type: String, 
        trim : true,
        required: true
    }
}, { _id: false });     // Does not create '_id' for nested object 

const UserShortSchema = new Schema({
    id: {
        type: String, 
        trim : true,
        required: true
    },
    name: {
        type: String, 
        trim : true,
        required: true
    }
}, { _id: false });     // Does not create '_id' for nested object 

const EventSchema = new Schema({
    id: {
        type: String, 
        trim : true,
        required: true
    },
    type: {
        type: String, 
        trim : true,
        required: true
    }
}, { _id: false });     // Does not create '_id' for nested object 

const CelebrantSchema = new Schema({
    name: {
        type: String, 
        trim : true,
        required: true
    },
    birthDate: {
        type: String, 
        trim : true,
        required: true
    },
    birthMonth: {
        type: String, 
        trim : true,
        required: true
    },
    birthYear: {
        type: String, 
        trim : true,
        required: true
    }
}, { _id: false });     // Does not create '_id' for nested object 

const ServiceSchema = new Schema({
    
    _id: {
        type: String, 
        trim : true,
        required: false
    },
    name: {
        type: String, 
        trim : true,
        required: false
    },
    type: {
        type: String, 
        trim : true,
        required: false
    },
    imageUrl: {
        type: String, 
        trim : true,
        required: false
    },
    label: {
        type: String, 
        trim : true,
        required: false
    },
    description: {
        type: String, 
        trim : true,
        required: false
    },
    amount: {
        type: String, 
        trim : true,
        required: false
    },
}, { _id: false });     // Does not create '_id' for nested object 

const BookingSchema = new Schema(
    {
        event: {
            type: EventSchema,
            required: true
        },
        packageDetails: {
            type: PackageSchema,
            required: true,
        },
        extraGuests: {
            type: Number,
            required: false,
        },
        extraMeals: {
            type: Number,
            required: false,
        },
        totalGuests: {
            type: Number,
            required: false,
        },
        totalMeals: {
            type: Number,
            required: false,
        },
        totalAmount: {
            type: Number,
            required: false,
        },
        branch: {
            type: BranchSchema,
            required: true,
        },
        userDetails: {
            type: UserShortSchema,
            required: true,
        },
        celebrantDetails: {
            type: CelebrantSchema,
            required: false
        },
        eventDate: {
            type: Number,
            required: true
        },
        eventTime: {
            type: Number,
            required: true,
        },
        isPrivate: {
            type: Boolean,
            required: false,
        },
        eventType: {
            type: String, 
            trim : true,
            required: false,
        },
        services: {
            type: [ServiceSchema],
            // required: false,
        },
        additionalRequests: {
            type: String, 
            trim : true,
            required: false
        },
        e_invitation:{
            type: String, 
            trim : true,
            required: false
        },
        banner:{
            type: String, 
            trim : true,
            required: false
        },
        status: {
            type: String, 
            trim : true,
            required: true,
        },
        uploadlogo:{
            type: String, 
            trim : true,
            required: false,
        },
        bowllingMedal:{
            type: String, 
            trim : true,
            required: false,
        },
        decoration:{
            type: String, 
            trim : true,
            required: false,
        },
        createdAt: {
            type: Number,
            required: false,
        },
        updatedAt: {
            type: Number,
            required: false,
        },
        cancelReason:{ 
            type: String,
            required: false,
        },
        qrCode:{ 
            type: String,
            required: false,
        },
        review:{
            type:Boolean,
            default: false,
        },
        eventEndTime:{
            type: Number,
            required: true,
        },
        duration:{
            type: Number,
            required: false,
        }
    },
    { versionKey: false, timestamps: false },
);

BookingSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    } else {
        this.updatedAt = Date.now();
    }
    next();
});

BookingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const BookingModel = mongoose.model('Booking', BookingSchema, 'bookings');

export { BookingSchema, BookingModel };