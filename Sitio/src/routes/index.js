const express = require('express');
const router = express.Router();

const {index, search, prueba} = require('../controllers/mainControllers')

router.get('/',index);
router.get('/search', search);
router.get('/prueba', prueba)

module.exports= router;