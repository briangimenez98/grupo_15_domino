module.exports = (sequelize, dataTypes) => { 

    let alias = "Rol"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        nombre: {
            type: Sequelize.STRING(45),
            allowNull: false,
        }
       
    };

    let config = { 
        tableName : 'roles', 
    };

    const Rol = sequelize.define(alias,cols,config); 

    /* relaciones */

    Rol.associate = models => {
        /* defino las relaciones */
        Rol.hasMany(models.Usuario,{
            as : 'usuario',
            foreignKey : 'roles_id'
        })

    }

    return Rol
}