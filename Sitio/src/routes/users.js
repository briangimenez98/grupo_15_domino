/* Requires */
const express = require('express');
var router = express.Router();
const {login, register, registerValidator, loginValidator} = require('../controllers/usersController')
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

/* Routes */
router.get('/login', login);
router.post('/login',loginValidation, loginValidator);
router.get('/register', register);
router.post('/register', registerValidation , registerValidator);
module.exports = router;
