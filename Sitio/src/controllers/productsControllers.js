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
        Categoria.findAll()
            .then(categorias => {
                let array = []
                for (let i = 0; i < categorias.length; i++) {
                    array.push(i+1)
                }
                return res.json(array)
            })
    },
    createProduct: (req, res) => {
        Productos.findAll()
            .then(productos => {
                Talles.findAll()
                    .then(talles => {
                        Categoria.findAll()
                            .then(categorias => {
                                return res.render("construction.ejs")
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
                    /* let arrayTalles = [];
                    for (let i = 0; i < talle.length; i++) {
                        let talles = {
                            productoId: producto.id,
                            talleId: talle[i]
                        }
                        array.push(talles)
                    }
                    talleProducto.bulkCreate(arrayTalles, { validate: true }) */
                    talleProducto.create({
                        productoId: producto.id,
                        talleId: talle
                    })
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
        }/* else {
            return res.send({errors: errors.mapped()})
        }  *//* else {
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
        } */
    },
    editProduct: (req, res) => {
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
                                return res.render("construction.ejs")
                                return res.render("editProduct.ejs", {producto, talles, categorias})
                            })
                    })
            })
    },
    edit : (req, res) => {
        let errors = validationResult(req);

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
                talleProducto.update({
                    productoId: producto.id,
                    talleId: req.body.talle ? req.body.talle : talleProducto.talleId
                }, {
                    where: {productoId: producto.id}
                })
                return res.redirect("/products")
            }).catch(error => {
                console.log(error);
            })
        } else {
            return res.render('editProduct.ejs', {errors: errors.mapped(), old: req.body})
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