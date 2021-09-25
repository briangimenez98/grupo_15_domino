module.exports = (sequelize, dataTypes) => { 

    let alias = "Marca"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        nombreMarca: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
       
    };

    let config = { 
        tableName : 'marcas', 
    };

    const Marca = sequelize.define(alias,cols,config); 

    /* relaciones */

    Marca.associate = models => {
        /* defino las relaciones */
        Marca.hasMany(models.Producto,{
            as : 'producto',
            foreignKey : 'marcas_id'
        })

    }

    return Marca
}