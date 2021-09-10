/* Requires */
var express = require('express');
var router = express.Router();
const {index, detail, carrito, createProduct, editProduct, destroy, edit, addProduct} = require('../controllers/productsControllers');
const path = require('path');

/* Middlewares */

const adminMiddleware = require('../middlewares/adminMiddleware');

/* Multer */
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


/* Products Routes */
router.get('/', index);
router.get('/detail/:id', detail);
router.get('/carrito', carrito);
router.get('/createProduct', adminMiddleware,createProduct);
router.post('/createProduct',upload.any('image',4),adminMiddleware,addProduct);
router.get('/editProduct/:id', adminMiddleware,editProduct);
router.put('/editProduct/:id', adminMiddleware,edit);
router.delete('/delete/:id', adminMiddleware,destroy);
router.post('/createProduct', adminMiddleware, addProduct);
module.exports= router;
