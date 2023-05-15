const express = require('express');
const router = express.Router();//creates a router object
const ctrl = require('../controllers');

router.post('/signup', ctrl.auth.signup);
router.post('/login', ctrl.auth.login);
router.post('/test', ctrl.auth.test);
router.get('/validate', ctrl.auth.validate);

// router.post('/logout', ctrl.auth.logout);


module.exports = router