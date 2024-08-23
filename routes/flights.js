const router = require('express').Router();

const Flight = require('../controllers/flights');

router.route('/')
    .get(Flight.List)
    .post(Flight.Create);

router.route('/:id')
    .get(Flight.Get)
    .put(Flight.Update)
    .delete(Flight.Delete);


module.exports = router;
