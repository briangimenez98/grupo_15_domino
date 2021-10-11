const db = require('../database/models');
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const {validationResult} = require('express-validator')
const toThousand = require('../utils/toThousand');
const Productos = db.Producto;
const Imagenes = db.Imagen;


let talleProducto = db.talles_producto;
let Categoria = db.Categoria;
let colorProducto = db.colores_producto;

module.exports = {

    index: (req, res) => {
        Productos.findAll()
            .then(productos => {
                Imagenes.findAll({
                    include: {association: "Producto"},
                    attributes: ['productoId', 'nombre'],
                    group: ['productoId']    
                })
                    .then(imagenes => {
                        return res.render('products', {
                            productos,
                            toThousand,
                            imagenes
                    }).catch(error => {
                        console.log(error);
                    })
            })
        })
                .catch(error => {
                    console.log(error);
                })
    },

    detalle: (req, res) => {

        Productos.findByPk(req.params.id,{
            include: [{association: "Categoria"}, 
            {association: "Colores"}, 
            {association: "Genero"}, 
            {association:"Talles"}]
        }).then(producto => {
            Imagenes.findAll({
                include: {association: "Producto"},
                where: {productoId: req.params.id}
            }).then(imagenes => {
                    return res.render('detalle', {producto, imagenes})
                })
                .catch(error => console.log(error))
            })
    },
    carrito: (req, res) => {
        Productos.findAll({
            include: [{association: "Categoria"},
            {association:"Talles"}]
            /* attributes: ['productoId', 'nombre'],
            group: ['productoId']       */ 
        })
            .then(productos => {
                return res.send(productos)
            }) 
                .catch(error => {
                    console.log(error);
                })
                //Retorna como un array de objetos productos[i].nombre
    },
    createProduct: (req, res) => {
        res.render('createProduct', {
            Productos,
        })
    },
    addProduct: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){

            const {nombre, descripcion,categoria,talle,genero,precio} = req.body;

            Productos.create({
                nombre,
                precio,
                descripcion,
                marca: "Domino",
                descuento: 0,
                idCategoria: categoria,
                idGeneros: genero
            }).then(producto => {
                    talleProducto.create({
                        productoId: producto.id,
                        talleId: talle
                    }).then(talleProducto => {
                        var images = [];
                        var imagenes = req.files.map(imagen => imagen.filename);
                        imagenes.forEach(img => {
                            var image = {
                                nombre: img,
                                productoId: producto.id
                            }
                            images.push(image)
                    });
                        Imagenes.bulkCreate(images, { validate: true })
                        .then(() => console.log('imagenes agregadas'))
                        return res.redirect("/products/")
                    })
            }).catch(error => {
                console.log(error);
            })

        }
    },
    editProduct: (req, res) => {
        Productos.findByPk(req.params.id, {
            include: [{association: "Categoria"}, 
            {association: "Colores"}, 
            {association: "Genero"}, 
            {association:"Talles"}]
        })
            .then(producto => {
                return res.render('editProduct.ejs', {producto, Productos})
            })
    },
    edit : (req, res) => {
        let errors = validationResult(req);
        const {nombre,descripcion,precio,talle,categoria} = req.body;

        if(errors.isEmpty()){
            Productos.update({
                nombre,
                precio,
                descripcion,
                idCategoria: categoria,
                idGeneros: genero
            }).then(producto => {
                talleProducto.update({
                    productoId: producto.id,
                    talleId: talle
                }).then(() => {
                    return res.redirect('/products')
                }).catch(error => {
                    console.log(error);
                })
            })
        }
    },
    destroy: (req, res) => {

        Imagenes.destroy({
            where: {productoId:req.params.id}
        }).then(
            talleProducto.destroy({
                where: {productoId: req.params.id}
            }).then(
                Productos.destroy({
                    where: {id: req.params.id}
                })
                ).then(() => {
                    return res.redirect("/products");
                }).catch(error => {
                    console.log(error);
                })
        )
    }
}