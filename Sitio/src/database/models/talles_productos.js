module.exports = (sequelize, dataTypes) => {
    let alias = "talles_productos";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        id_producto: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_talle: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "talles_producto",
        timestamps: false
    };
    const talles_productos = sequelize.define(alias,cols,config);
    return talles_productos;
}