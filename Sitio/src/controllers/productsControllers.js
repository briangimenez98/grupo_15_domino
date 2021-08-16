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
            let producto = {
                id : productos[productos.length - 1].id + 1,
                seccion,
                clase,
                name,
                price : +price,
                image : req.file,
                category,
                talle,
                description
            }
           productos.push(producto);
           guardar(productos)
           return res.redirect('/')
    },
    editProduct: (req, res) => {
        let producto = productos.find(p => p.id === +req.params.id)
        return res.render('editProduct',{
            producto,
            productos
        })
    },
    edit : (req, res) => {
        res.send(req.body)
    },
    destroy : (req, res) => {

		productos.forEach(producto => {
			if (producto.id === +req.params.id){
				let productAEliminar = productos.indexOf(producto);
				productos.splice(productAEliminar,1)
			}
		});

        fs.writeFileSync(path.join(__dirname, '../data/products.json'),JSON.stringify(productos,null,2),'utf-8')
		return res.redirect('/products/')
	}
}