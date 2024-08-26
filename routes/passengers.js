const router = require('express').Router();

const Passenger = require('../controllers/passengers');

router.route('/')
    .get(Passenger.List)
    .post(Passenger.Create);

router.route('/:id')
    .get(Passenger.Read)
    .put(Passenger.Update)
    .delete(Passenger.Delete);


module.exports = router;