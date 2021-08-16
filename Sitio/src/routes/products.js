var express = require('express');
var router = express.Router();
const {index, detail, carrito, createProduct, editProduct, destroy, edit, addProduct} = require('../controllers/productsControllers');
const path = require('path');
//multer//
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,file, callback) => {
        callback(null,'public/img')
    },
    filename : (req, file, callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})


/* GET home page. */
router.get('/', index);
router.get('/detail/:id', detail);
router.get('/carrito', carrito);
router.get('/createProduct', createProduct);
router.post('/createProduct',upload.any('image',4),addProduct);
router.get('/editProduct/:id', editProduct);
router.put('/editProduct/:id', edit);
router.delete('/delete/:id', destroy);
router.post('/createProduct', addProduct)
module.exports= router;
