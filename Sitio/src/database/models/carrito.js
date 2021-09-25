module.exports = (sequelize, dataTypes) => { 

    let alias = "Carrito"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        items: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
       
    };

    let config = { 
        tableName : 'carritos', 
    };

    const Carrito = sequelize.define(alias,cols,config); 

    /* relaciones */

    

    return Carrito
}