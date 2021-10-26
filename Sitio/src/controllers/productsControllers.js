const db = require('../database/models');
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const {validationResult} = require('express-validator')
const toThousand = require('../utils/toThousand');
const Productos = db.Producto;
const Imagenes = db.Imagen;
const Talles = db.Talle;
const talleProducto = db.talles_producto;
const Categoria = db.Categoria;
const colorProducto = db.colores_producto;



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
            include: [{association: "Genero"}, {association:"Categoria"}]
        })
            .then(productos => res.json(productos))
    },
    createProduct: (req, res) => {
        Productos.findAll()
            .then(productos => {
                Talles.findAll()
                    .then(talles => {
                        Categoria.findAll()
                            .then(categorias => {
                                /* return res.render("construction.ejs") */
                                return res.render("createProduct.ejs", {productos, talles, categorias})
                            })
                    })
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
                let arrayT = [];
                for (let j = 0; j < talle.length; j++) {
                    let talles = {
                        productoId: producto.id,
                        talleId: talle[j]
                    }
                    arrayT.push(talles)
                }
                talleProducto.bulkCreate(arrayT,{validate:true})
                    .then(() => {
                    var images = [];
                    var imagenes = req.files.map(imagen => imagen.filename);
                        imagenes.forEach(img => {
                            var image = {
                                nombre: img,
                                productoId: producto.id
                            }
                            images.push(image)
                            })
                    Imagenes.bulkCreate(images, { validate: true })
                            .then(() => {
                                console.log('imagenes agregadas')
                                return res.redirect("/products")
                            }).catch(error => console.log(error))
                    })
                })
        } else {
            return res.send(errors)
            Productos.findAll()
            .then(productos => {
                Talles.findAll()
                    .then(talles => {
                    Categoria.findAll()
                        .then(categorias => {
                            return res.render("createProduct.ejs", {errors: errors.mapped(), old: req.body, productos, categorias, talles})
                        })
                    })
                })
        }
    },
    editProduct: (req, res) => {
        return res.render("construction.ejs")
        Productos.findByPk(req.params.id, {
            include: [{association: "Categoria"}, 
            {association: "Colores"}, 
            {association: "Genero"}, 
            {association:"Talles"}]
        }).then(producto => {
                Talles.findAll()
                    .then(talles => {
                        Categoria.findAll()
                            .then(categorias => {
                                Imagenes.findAll({
                                    where: {productoId: req.params.id}
                                }).then(imagenes => {
                                    return res.render("editProduct.ejs", {producto, talles, categorias, imagenes})
                                })
                            })
                    })
            })
    },
    edit : (req, res) => {
        let errors = validationResult(req);
        const {talle} = req.body;

        if(errors.isEmpty()){
            Productos.update({
                nombre: req.body.nombre ? req.body.nombre : Productos.nombre,
                precio: req.body.precio ? req.body.precio : Productos.precio,
                descripcion: req.body.descripcion ? req.body.descripcion : Productos.descripcion,
                idCategoria: req.body.categoria ? req.body.categoria : Productos.idCategoria,
                idGeneros: req.body.genero ? req.body.genero : Productos.idGeneros
            }, {
                where: {id: req.params.id}
            }).then(producto => {
                let tallesArray = [];
                for (let j = 0; j < talle.length; j++) {
                    tallesArray.push(talle)
                }
                for (let i = 0; i < tallesArray.length; i++) {
                    talleProducto.update({
                        productoId: producto.id,
                        talleId: tallesArray[i] ? tallesArray[i] : talleProducto.talle
                    },{
                        where:{productoId: req.params.id}
                    })
                }
                return res.send("Success")
            })
        } else {
            Productos.findByPk(req.params.id, {
                include: [{association: "Categoria"}, 
                {association: "Colores"}, 
                {association: "Genero"}, 
                {association:"Talles"}]
            }).then(producto => {
                    Talles.findAll()
                        .then(talles => {
                            Categoria.findAll()
                                .then(categorias => {
                                    return res.render("editProduct.ejs", {producto, talles, categorias, errors: errors.mapped(), old: req.body})
                                })
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