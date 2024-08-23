const mongoose = require('mongoose')

const User = require('./users');
const Flight = require('./flights');


const reservationSchema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    passenger: {
        type: String,
        required: true
    },
 createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    collection: 'reservations',
    timestamps: true
});


module.exports = mongoose.model('Reservation', reservationSchema);