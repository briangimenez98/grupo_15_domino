module.exports = (sequelize, dataTypes) => { 

    let alias = "Colores"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        nombreColor: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
       
    };

    let config = { 
        tableName : 'colors', 
    };

    const Color = sequelize.define(alias,cols,config); 

    return Color
}