module.exports = (sequelize, dataTypes) => {
    let alias = "Imagenes";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        id_producto: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "imagenes",
        timestamps: false
    };
    const Imagen = sequelize.define(alias,cols,config);
    Imagen.associate = models => {
        Imagen.belongsTo(models.Producto, {
            as: "imagenProducto",
            foreignKey: "id_producto"
        })
    }
    return Imagen;
}