var express = require('express');
var router = express.Router();
const {index, detail, carrito, createProduct, editProduct, destroy} = require('../controllers/productsControllers')

/* GET home page. */
router.get('/', index);
router.get('/detail/:id', detail);
router.get('/carrito', carrito);
router.get('/createProduct', createProduct);
router.get('/editProduct/:id', editProduct);
router.delete('/delete/:id', destroy);
module.exports= router;
