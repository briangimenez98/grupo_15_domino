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
                rol : "user",
                avatar: "default-profile-image.jpg"
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
        const {email, recordar} = req.body; 
        if (errors.isEmpty()){
            let usuario = usuarios.find(usuario => usuario.email === email)
            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol: usuario.rol,
                apellido: usuario.apellido,
                email: usuario.email,
                avatar: usuario.avatar
            }
            if (recordar){
                res.cookie('dominoCookie', req.session.userLogin, {
                    maxAge: 1000*180
                })
            }
        return res.redirect('/')
        } else {
            return res.render('login', {errors: errors.mapped(), old: req.body})
        }
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('dominoCookie',null,{maxAge:-1})
        return res.redirect('/');
    },
    profileUser : (req,res) => {
        let locals = {
            title: "Domino | Mi Perfil",
            user : usuarios.find(usuario => usuario.id === req.session.userLogin.id)
        }
        res.render('profileUser', locals);
    },
    profileUserChanges: (req, res) => {
        let errors = validationResult(req)

        let locals = {
            title: "Domino | Mi Perfil",
            user : usuarios.find(usuario => { usuario.id === req.session.userLogin.id})
        }

        if(errors.isEmpty()){
            usuarios.find(usuario => {
                if(usuario.id === req.session.userLogin.id){
                    usuario.nombre = req.body.nombre ? req.body.nombre : usuario.nombre;
                    usuario.apellido = req.body.apellido ? req.body.apellido : usuario.apellido;
                    usuario.password =  req.body.password ? bcrypt.hashSync(req.body.password, 10) : usuario.password;
                    usuario.email =  req.body.email ? req.body.email : usuario.email;
                    usuario.avatar = req.file ? req.file.filename : usuario.avatar;
                }
                guardar(usuarios)
            })
        } 

        res.redirect('/users/miperfil')
    }
}