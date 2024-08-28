const Token = require('../models/token');

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;
    const tokenkey =  auth ?  auth.split(' ') : null; // get token from header authorization value

    if (tokenkey) {
        if(tokenkey[0] == 'Token'){
            const tokenData = await Token.findOne({ token: tokenkey[1] }).populate('userId'); // populate userId from token collection with user collection 
req.user = tokenData ? tokenData.userId : false;
 
        }
    }
    next();

}