/* Requires */
const express = require('express');
var router = express.Router();
const {login, register, processRegister, processLogin, logout} = require('../controllers/usersController')
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

/* Users Multer */

const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,file, callback) => {
        callback(null,'public/img/usersProfilePics')
    },
    filename : (req, file, callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})


/* Users Routes */
router.get('/login', login);
router.post('/login',loginValidation, processLogin);
router.get('/register', register);
router.post('/register', registerValidation , processRegister);
router.get('/logout',logout);
module.exports = router;
