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
                id : usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
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
    processLogin : (req, res) => {
        let errors = validationResult(req);
        const {email, password} = req.body; 
        if (errors.isEmpty()){
            let usuario = usuarios.find(usuario => usuario.email === email)
            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol: usuario.rol
            }
            return res.redirect('/')
        } else {
            return res.render('login', {errors: errors.mapped(), old: req.body})
        }
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('dominoCookie',null,{maxAge:-1})
        return res.redirect('/')
    }
}