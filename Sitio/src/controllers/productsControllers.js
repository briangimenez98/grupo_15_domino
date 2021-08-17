const fs = require('fs');
const path = require('path');

const {productos, guardar} = require('../data/products_db');
const toThousand = require('../utils/toThousand');

module.exports = {
    index: (req, res) => {
        return res.render('products', {
            productos,
            toThousand,
        })
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
        res.render('createProduct', {
        productos,
        })
    },
    addProduct : (req, res) => {
        const {name, description,price,category, seccion, talle, clase} = req.body;

        let images= [(req.files[0]?req.files[0].filename:"defaultimage.png"),(req.files[1]?req.files[1].filename:"defaultimage.png"),(req.files[2]?req.files[2].filename:"defaultimage.png"),(req.files[3]?req.files[3].filename:"defaultimage.png")]

            let producto = {
                id : productos[productos.length - 1].id + 1,
                seccion,
                clase,
                name,
                price : +price,
                image : images,
                category,
                talle,
                description
            }
           productos.push(producto);
           guardar(productos)
           return res.redirect('/products/')
    },
    editProduct: (req, res) => {
        let producto = productos.find(p => p.id === +req.params.id)
        return res.render('editProduct',{
            producto,
            productos
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
    destroy : (req, res) => {

		productos.forEach(producto => {
			if (producto.id === +req.params.id){
				let productAEliminar = productos.indexOf(producto);
				productos.splice(productAEliminar,1)
			}
		});

        guardar(productos)
		return res.redirect('/products/')
	}
}