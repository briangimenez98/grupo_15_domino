var express = require('express');
var router = express.Router();
const {index, detail, carrito, createProduct, editProduct, products, destroy} = require('../controllers/mainControllers')

/* GET home page. */
router.get('/', index);
router.get('/detail/:id', detail);
router.get('/carrito', carrito);
router.get('/createProduct', createProduct);
router.get('/editProduct/:id', editProduct);
router.get('/products', products);
router.delete('/delete/:id', destroy);
module.exports = router;
