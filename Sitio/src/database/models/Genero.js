module.exports = (sequelize, dataTypes) => {
    let alias = "Genero";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        genero: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    };
    let config = {
        tableName: "generos",
        timestamps: false
    };
    const Genero = sequelize.define(alias,cols,config);
    return Genero;
}