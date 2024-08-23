const router = require('express').Router();

const user = require('../controllers/users');

router.route ('/')
    .get(user.List)
    .post(user.Create);


router.route('/:id')
    .get(user.Read)
    .put(user.Update)
    .delete(user.Delete);

module.exports = router;
