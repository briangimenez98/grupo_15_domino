const express = require('express');
const router = express.Router();

const {index} = require('../controllers/mainControllers')

router.get('/',index)

module.exports= router;