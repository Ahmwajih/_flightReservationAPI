const mongoose = require('mongoose');

const User = require('./users');
const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    token: {
        type: String,
        required: true,
        trim: true,
        index: true
    }
},
{
    collection: 'tokens',
    timestamps: true
});

module.exports = mongoose.model('Token', userSchema);