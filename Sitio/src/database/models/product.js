module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        precio: {
            type: dataTypes.FLOAT.UNSIGNED,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        descuentos: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
        marca: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        categorias_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        generos_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "productos",
        timestamps: true,
    };
    const Product = sequelize.define(alias, cols, config);

    /* Relaciones */

    Product.associate = models => {
        Product.belongsTo(models.Categoria, {
            as: "productoCategoria",
            foreignKey: "categorias_id"
        })
        Product.belongsTo(models.Genero, {
            as: "productoGenero",
            foreignKey: "generos_id"
        })
        Product.belongsToMany(models.colores_producto, {
            as: "color",
            through: "colores_producto",
            foreignKey: "id_producto",
            otherKey:"id_color",
            timestamps: false
        })
        Product.belongsToMany(models.talles_productos, {
            as: "talles",
            through: "talles_productos",
            foreignKey: "id_producto",
            otherKey:"id_talle",
            timestamps: false
        })

        Product.belongsToMany(models.Carrito, {
            as: "carrito",
            through: "Carrito",
            foreignKey: "id_producto",
            otherKey:"id_usuario",
            timestamps: false
        })
    }

    return Product;
}