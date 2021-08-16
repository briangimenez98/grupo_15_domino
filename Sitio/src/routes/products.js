var express = require('express');
var router = express.Router();
const {index, detail, carrito, createProduct, editProduct, destroy, edit, addProduct} = require('../controllers/productsControllers');
const path = require('path');
//multer//
const multer = require('multer');
const productsControllers = require('../controllers/productsControllers');
const { FILE } = require('dns');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/img'));
    },
    filename : function (req, file, cb) {
        const newFilename = 'image-' + Date.now() + path.extname(file.originalname)
        cb(null, newFilename);
    }
})
var upload = multer({ storage });

/* GET home page. */
router.get('/', index);
router.get('/detail/:id', detail);
router.get('/carrito', carrito);
router.get('/createProduct', createProduct);
router.post('/createProduct', upload.single('image'), productsControllers.addProduct);
router.get('/editProduct/:id', editProduct);
router.put('/editProduct/:id', edit);
router.delete('/delete/:id', destroy);
router.post('/createProduct', addProduct)
module.exports= router;
