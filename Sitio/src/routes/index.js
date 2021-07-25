var express = require('express');
var router = express.Router();
const {index, detail, carrito} = require('../controllers/mainControllers')

/* GET home page. */
router.get('/', index);
router.get('/detail', detail);
router.get('/carrito', carrito);
module.exports = router;
