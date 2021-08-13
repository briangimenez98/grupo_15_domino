const productos = require('../data/products_db');
const toThousand = require('../utils/toThousand');

module.exports = {
    index : (req, res) => {
        res.render('home', {
            productos,
            principales : productos.filter(producto => producto.seccion === "principal"),
            seleccionados1 : productos.filter(producto => producto.seccion === "seleccionado1"),
            seleccionados2 : productos.filter(producto => producto.seccion === "seleccionado2"),
            seleccionados3 : productos.filter(producto => producto.seccion === "seleccionado3"),
            destacados1 : productos.filter(producto => producto.seccion === "destacado1"),
            destacados2 : productos.filter(producto => producto.seccion === "destacado2"),
            destacados3 : productos.filter(producto => producto.seccion === "destacado3"),
            toThousand,

            
        });
    },
    detail : (req, res) => {
        let producto = productos.find(p => p.id === +req.params.id)
        return res.render('detalle', {
            producto,
            productos
        })
    },
    carrito : (req, res) => {
        res.render('carrito')
    },
    createProduct : (req, res) => {
        res.render('createProduct')
    },
    editProduct: (req, res) => {
        let producto = productos.find(p => p.id === +req.params.id)
        return res.render('editProduct',{
            producto,
            productos
        })
    },
    products: (req, res) => {
        return res.render('products', {
            productos,
            principales : productos.filter(producto => producto.seccion === "principal"),
            seleccionados1 : productos.filter(producto => producto.seccion === "seleccionado1"),
            seleccionados2 : productos.filter(producto => producto.seccion === "seleccionado2"),
            seleccionados3 : productos.filter(producto => producto.seccion === "seleccionado3"),
            destacados1 : productos.filter(producto => producto.seccion === "destacado1"),
            destacados2 : productos.filter(producto => producto.seccion === "destacado2"),
            destacados3 : productos.filter(producto => producto.seccion === "destacado3"),
            toThousand,
        })
    }
}