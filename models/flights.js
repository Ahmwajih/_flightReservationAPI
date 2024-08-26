const mongoose = require('mongoose');

const User = require('./users');
const flightSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        airline: {
            type: String,
            required: true,
            trim: true,
        },
        departure: {
            type: String,
            required: true,
            trim: true,
        },
        arrival: {
            type: String,
            required: true,
            trim: true,
        },
        departureDate: {
            type: Date,
            required: true,
        },
        arrivalDate: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        createdId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        collection: 'flights',
        timestamps: true,
    }
);

module.exports = mongoose.model('Flight', flightSchema);