const fs = require('fs');
const path = require('path');

const productos = require('../data/products_db');
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
        res.render('createProduct')
    },
    editProduct: (req, res) => {
        let producto = productos.find(p => p.id === +req.params.id)
        return res.render('editProduct',{
            producto,
            productos
        })
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