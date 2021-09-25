module.exports = (sequelize, dataTypes) => { 

    let alias = "Producto"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        name : {
            type : dataTypes.STRING(250), 
            allowNull : false 
        },
        description: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        discount: {
            type: Sequelize.INTEGER,
        },
        image: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
    
    };

    let config = { 
        tableName : 'products', 
        timestamps : true, 
        underscored : true 
    };

    const Product = sequelize.define(alias,cols,config); 

    /* relaciones */

    Producto.associate = models => {
        /* defino las relaciones */
        Producto.belongsTo(models.Categoria,{
            as : 'categories',
            foreignKey : 'categories_id'
        })

        Producto.belongsTo(models.Marca,{
            as : 'marca',
            foreignKey : 'marcas_id'
        })

        Producto.belongsTo(models.Genero,{
            as : 'genero',
            foreignKey : 'generos_id'
        })

        Producto.belongsTo(models.Seccion,{
            as : 'seccion',
            foreignKey : 'sections_id'
        })
    }

    return Product 
}