const router = require('express').Router();


const  auth = require('../controllers/auth');

router.post('/login', auth.Login);
// router.post('/refresh', auth.refresh);
router.post('/logout', auth.logout);


module.exports = router;