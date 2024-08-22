const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('*****Database connected*****');

    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = dbConnection;