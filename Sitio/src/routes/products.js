/* Requires */
var express = require('express');
var router = express.Router();
const {index, detalle, carrito, createProduct, editProduct, destroy, edit, addProduct} = require('../controllers/productsControllers');
const path = require('path');

/* Middlewares */

const createValidator = require("../validations/createValidation");
const adminMiddleware = require('../middlewares/adminMiddleware');

/* Multer */
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,file, callback) => {
        let folder = path.join('public/img/products');
        callback(null,folder)
    },
    filename : (req, file, callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})


/* Esto viene como /products/... */

router.get('/', index);
router.get('/detail/:id',detalle);
router.get('/carrito',carrito);
router.get('/createProduct',adminMiddleware,createProduct);
router.post('/createProduct',upload.any('image',4),adminMiddleware,addProduct,createValidator,);
router.get('/editProduct/:id',adminMiddleware,editProduct);
router.put('/editProduct/:id',adminMiddleware,edit);
router.delete('/delete/:id',adminMiddleware,destroy);

module.exports= router;
