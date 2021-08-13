var express = require('express');
var router = express.Router();
const {index, detail, carrito, createProduct, editProduct, products} = require('../controllers/mainControllers')

/* GET home page. */
router.get('/', index);
router.get('/detail/:id', detail);
router.get('/carrito', carrito);
router.get('/createProduct', createProduct);
router.get('/editProduct', editProduct);
router.get('/products', products);
module.exports = router;
