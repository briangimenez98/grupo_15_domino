module.exports = (sequelize, dataTypes) => { 

    let alias = "Seccion"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        section: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
       
    };

    let config = { 
        tableName : 'sections', 
    };

    const Section = sequelize.define(alias,cols,config); 

    /* relaciones */

    Section.associate = models => {
        /* defino las relaciones */
        Section.hasMany(models.Producto,{
            as : 'producto',
            foreignKey : 'sections_id'
        })

    }

    return Section
}