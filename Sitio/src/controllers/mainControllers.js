const fs = require('fs');
const path = require('path');
const {productos} = require('../data/products_db');
const toThousand = require('../utils/toThousand');
const db = require("../database/models");
const Op = db.Sequelize.Op;
const Productos = db.Producto;
const Imagenes = db.Imagen;

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
        
        Productos.findAll({
            where: {
                [Op.or] : [{nombre: {[Op.substring] : req.query.buscador.toLowerCase().trim()}}]
            }
            
        }).then( producto => {

            let productos = producto.id;

            return res.json(productos)
            Imagenes.findAll({
                include:[{association: "Producto"}],
            })
        }).catch(error => console.log(error));
        

        /* let results = productos.filter(producto => producto.name.toLowerCase().includes(req.query.buscador.toLowerCase().trim()));
        return res.render('results', {
            results,
            toThousand,
            buscador : req.query.buscador.trim()
        }); */
    },
}