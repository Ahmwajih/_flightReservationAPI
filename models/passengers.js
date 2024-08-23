const mongoose = require('mongoose')


const User = require('./users');

const passengerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [
            // Email must be in the correct format.
            function (email) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
            },
            "Email must be in the correct format.",
        ],
    },
    createdID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{

    collection: 'passengers',
    timestamps: true
    })

module.exports = mongoose.model('Passenger', passengerSchema);