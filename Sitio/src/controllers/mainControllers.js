const fs = require('fs');
const path = require('path');
const {usuarios} = require('../data/users_db')
const {productos} = require('../data/products_db');
const toThousand = require('../utils/toThousand');

module.exports = {
    index : (req, res) => {
        res.render('home', {
            productos,
            principales : productos.filter(producto => producto.seccion === "principal"),
            /* ----- carrusel ----- */
            seleccionados1 : productos.filter(producto => producto.seccion === "seleccionado1"),
            seleccionados2 : productos.filter(producto => producto.seccion === "seleccionado2"),
            seleccionados3 : productos.filter(producto => producto.seccion === "seleccionado3"),
            destacados : productos.filter(producto => producto.seccion === "destacado"),
            /* destacados2 : productos.filter(producto => producto.seccion === "destacado2"),
            destacados3 : productos.filter(producto => producto.seccion === "destacado3"), */
            toThousand
        });
    },
    search : (req, res) => {
        let results = productos.filter(producto => producto.name.toLowerCase().includes(req.query.buscador.toLowerCase().trim()));
        return res.render('results', {
            results,
            toThousand,
            buscador : req.query.buscador.trim()
        });
    },
}