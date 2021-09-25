module.exports = (sequelize, dataTypes) => { 

    let alias = "Talle"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        talle: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
       
    };

    let config = { 
        tableName : 'talles', 
    };

    const Talle = sequelize.define(alias,cols,config); 

    return Talle
}