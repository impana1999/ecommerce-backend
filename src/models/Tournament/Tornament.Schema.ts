import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    title: {
        type: String,
        require:true,
        unique: true
    },
    description: {
        type: String, 
        trim : true,
        required: false
    },
    imageUrl: {
        type: String, 
        trim : true,
        required: false
    },
    totalEntries: {
        type: Number, 
        trim : true,
        required: false
    },
    date: {
        type: Number, 
        trim : true,
        required: false
    },
    time: {
        type: Number, 
        trim : true,
        required: false
    },
    totalAmount:{
        type: Number, 
        trim : true,
        required: false 
    },
    totalEntriesLeft:{
        type: Number, 
        trim : true,
        required: false 
    }
}, { timestamps: true });

tournamentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
  });

const TournamentModel = mongoose.model('tournament', tournamentSchema, 'tournament');

export  {TournamentModel};