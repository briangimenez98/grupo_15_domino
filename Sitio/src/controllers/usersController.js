const {usuarios, guardar} = require('../data/users_db')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = {
    login : (req, res) => {
        res.render('login');
    },
    register : (req, res) => {
        res.render('register');
    },
    processRegister : (req, res) => {
        let errors = validationResult(req);
        let {nombre,apellido,email,password,birthday} = req.body;
        if(errors.isEmpty()){

            let usuario = {
                id : usuarios.length > 0 ? usuarios[usuario.length - 1].id + 1 : 1,
                nombre,
                apellido,
                email,
                password : bcrypt.hashSync(password,10),
                birthday,
                rol : "user"
            }
            usuarios.push(usuario);
            guardar(usuarios);
            res.redirect('/');
        } else {
            res.render('register',{errors : errors.mapped(), old: req.body})
        };
    },
    loginValidator : (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            res.redirect('/')
        } else {
            res.render('login',{errors: errors.mapped(), old: req.body})
        };
    }
}