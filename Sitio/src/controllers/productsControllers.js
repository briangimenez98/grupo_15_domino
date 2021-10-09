const db = require('../database/models');
const Op = db.Sequelize.Op;
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
                    attributes: ['idProducto'],
                    group: ['idProducto']
                })
                    .then(imagenes => {
                        return res.render('products', {
                            productos,
                            toThousand,
                            imagenes
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
                where: {idProducto: req.params.id}
            }).then(imagenes => {
                    return res.render('detalle', {producto, imagenes})
                })
                .catch(error => console.log(error))
            })
    },
    carrito: (req, res) => {
        Imagenes.findAll({
            include: {association: "Producto"}
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

            const {nombre, descripcion,image,category,talle,genero,precio} = req.body;

            Productos.create({
                nombre,
                precio,
                descripcion,
                marca: "Domino",
                descuento: 0,
                idCategoria: category,
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
                                idProducto: producto.id
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
        Productos.findByPk(req.params.id)
            .then(producto => {
                return res.render('editProduct.ejs', {producto, Productos})
            })
    },
    edit : (req, res) => {
        const {name, description, price, category, seccion, talle, clase } = req.body;
        productos.forEach(producto => {
            if (producto.id === req.params.id){
                producto.id = +req.params.id
                producto.seccion = seccion,
                producto.clase = clase,
                producto.name = name,
                producto.price = +price,
                producto.category = category,
                producto.talle = talle,
                producto.description = description
            }
        })
        guardar(productos);
        return res.redirect('/products');
    },
    destroy: (req, res) => {

        Productos.destroy({
            where: {id: req.params.id}
        }).then(() => {
            talleProducto.destroy({
                where: {productoId: req.params.id}
            }).then(() => {
                Imagenes.destroy({
                    where: {idProducto:req.params.id}
                }).then(() => {
                    return res.redirect('/products/')
                })
            })
        }).catch(error => {
            console.log(error);
        })

        /* productos.forEach(producto => {
            if (producto.id === +req.params.id) {
                let productAEliminar = productos.indexOf(producto);
                productos.splice(productAEliminar, 1)
            }
        });

        guardar(productos)
        return res.redirect('/products/') */
    }
}