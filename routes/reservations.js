const router = require('express').Router();

const Reservation = require('../controllers/reservations');

router.route('/')
    .get(Reservation.List)
    .post(Reservation.Create);

router.route('/:id')
    .get(Reservation.Get)
    .put(Reservation.Update)
    .delete(Reservation.Delete);


module.exports = router;