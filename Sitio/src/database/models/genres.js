module.exports = (sequelize, dataTypes) => { 

    let alias = "Genero"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        genero: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
       
    };

    let config = { 
        tableName : 'generos', 
    };

    const Genre = sequelize.define(alias,cols,config); 

    /* relaciones */

    Genre.associate = models => {
        /* defino las relaciones */
        Genre.hasMany(models.Producto,{
            as : 'producto',
            foreignKey : 'generos_id'
        })

    }

    return Genre
}