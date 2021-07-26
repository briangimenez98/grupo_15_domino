var express = require('express');
var router = express.Router();
const {index, detail, carrito, createProduct} = require('../controllers/mainControllers')

/* GET home page. */
router.get('/', index);
router.get('/detail', detail);
router.get('/carrito', carrito);
router.get('/createProduct', createProduct);
module.exports = router;
