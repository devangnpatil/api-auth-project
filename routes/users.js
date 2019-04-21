const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeHelpers');
const UserController =  require('../controllers/users');
const mongoose = require('mongoose');
const passport = require('passport');
const passportCOnf = require('../passport');

mongoose.connect('mongodb+srv://devangnpatil:devangnpatil@cluster0-hzh7l.mongodb.net/userdata?retryWrites=true');
router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/signin')
    .post(UserController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', {session: false}), UserController.secret);
    // .get(UserController.secret);

module.exports = router;
