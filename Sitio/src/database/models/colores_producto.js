module.exports = (sequelize, dataTypes) => {
    let alias = "colores_producto";
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
        id_color: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "colores_producto",
        timestamps: false
    };
    const colores_producto = sequelize.define(alias,cols,config);

    colores_producto.associate = models => {
        colores_producto.hasMany(models.Color, { 
            as: "color",
            foreignKey: "id"
        })
        colores_producto.hasMany(models.Producto, { 
            as: "producto",
            foreignKey: "id"
        })
    } 

    return colores_producto;
}