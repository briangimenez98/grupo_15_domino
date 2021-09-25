module.exports = (sequelize, dataTypes) => { 

    let alias = "Categoria"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        nombreCategoria: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
       
    };

    let config = { 
        tableName : 'categories', 
    };

    const Categorie = sequelize.define(alias,cols,config); 

    /* relaciones */

    Categoria.associate = models => {
        /* defino las relaciones */
        Categoria.hasMany(models.Producto,{
            as : 'producto',
            foreignKey : 'categories_id'
        })

    }

    return Categorie
}