module.exports = (sequelize, dataTypes) => { 

    let alias = "Usuario"; 

    let cols = { 
        id : {
            type : dataTypes.INTEGER.UNSIGNED, 
            autoIncrement : true, 
            allowNull : false, 
            primaryKey : true 
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        apellido: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        avatar: {
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
        }
       
    };

    let config = { 
        tableName : 'users',
        timestamps : true, 
        underscored : true  
    };

    const User = sequelize.define(alias,cols,config); 

    /* relaciones */

    User.associate = models => {
        /* defino las relaciones */
        User.belongsTo(models.Rol,{
            as : 'rol',
            foreignKey : 'roles_id'
        })
    }

    return User
}