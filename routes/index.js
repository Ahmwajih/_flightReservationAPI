const router = require('express').Router();

router.all('/', (req, res) => {
    res.status(200).send({
        error: false,
        message: 'Welcome to the API'
    });
});

router.use('/users', require('./users'));
router.use('/flights', require('./flights'));
router.use('/passengers', require('./passengers'));
router.use('/reservations', require('./reservations'));
router.use('/auth', require('./auth'));



module.exports = router;