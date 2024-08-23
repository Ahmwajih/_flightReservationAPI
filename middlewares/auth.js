const Token = require('../models/token')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null // Token ...tokenKey...

    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']
    console.log(`auth: ${auth}`)

    // If custom token:
    if (tokenKey) {
        console.log('User authenticated with SIMPLE TOKEN')
        if (tokenKey[0] == 'Token') {
            // SimpleToken:

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : undefined
            console.log(req.user)

        }
        // Otherwise, JWT:
        else if (tokenKey[0] == 'Bearer') {
            console.log('user authenticated with JWT BEARER TOKEN')
            // JWT:
    
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (error, data) => {
                // //? Hata gösterimi yok:
                req.user = data
                console.log(req.user)
            })
        }
    } else {
        req.user = {
            isCustomer: false,
            isAdmin: false,
            isStaff: false,
            isLogin: false,
            public: true
        }
    }

    

    console.log('calling next after auth...')
    next()
}