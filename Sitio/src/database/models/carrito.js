module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        id_usuario: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        id_producto: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        items: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: dataTypes.FLOAT.UNSIGNED,
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
    };
    let config = {
        tableName: "carritos",
        timestamps: true
    };
    const Carrito = sequelize.define(alias,cols,config);
    return Carrito;
}