module.exports = (sequelize, dataTypes) => {
    let alias = "Color";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    };
    let config = {
        tableName: "colores",
        timestamps: false
    };
    const Color = sequelize.define(alias,cols,config);

   Color.associate = models => {
        Color.belongsToMany(models.colores_producto, {
            as: "producto",
            through: "colores_producto",
            foreignKey: "id_color",
            otherKey:"id_producto",
            timestamps: false
        })
    }

    return Color;
}