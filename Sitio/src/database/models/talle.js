module.exports = (sequelize, dataTypes) => {
    let alias = "Talle";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        talle: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };
    let config = {
        tableName: "talles",
        timestamps: false
    };
    const Talle = sequelize.define(alias,cols,config);

    Talle.associate = models => {
        Talle.belongsToMany(models.talles_productos, {
            as: "productos",
            through: "talles_productos",
            foreignKey: "id_talle",
            otherKey:"id_producto",
            timestamps: false
        })
    }
    return Talle;
}