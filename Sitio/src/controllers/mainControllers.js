const productos = require('../data/products_db');

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
        });
    },
    detail : (req, res) => {
        res.render('detalle');
    }, 
    carrito : (req, res) => {
        res.render('carrito')
    },
    createProduct : (req, res) => {
        res.render('createProduct')
    },
    editProduct: (req, res) => {
        res.render('editProduct')
    }
}