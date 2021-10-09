const db = require("../database/models");
const Op = db.Sequelize.Op;
const {usuarios, guardar} = require('../data/users_db')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
let Usuarios = db.Usuario;

module.exports = {
    login : (req, res) => {
        res.render('login.ejs');
    },
    register : (req, res) => {
        res.render('register.ejs');
    },
    processRegister : (req, res) => {
        let errors = validationResult(req);
        let {nombre,apellido,email,password,birthday} = req.body;

        if(errors.isEmpty()){
            Usuarios.create({
                nombre,
                apellido,
                email,
                password : bcrypt.hashSync(password,10),
                birthday,
                rol: "User",
                avatar: "default-profile-image.jpg"
            })
            .then( () => {
                res.redirect('/');
            })
        } else {
            res.render('register',{errors : errors.mapped(), old: req.body})
        }
    },
    processLogin : (req, res) => {
        let errors = validationResult(req)
        const {recordar} = req.body;

        if(errors.isEmpty()){
            Usuarios.findOne({
                where: {
                    email: req.body.email
                 }
            })
            .then(usuario => {
                    req.session.userLogin = {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        email: usuario.email,
                        avatar: usuario.avatar,
                        rol: usuario.rol
                    }
                    if(recordar){
                        res.cookie('dominoCookie', req.session.userLogin, {
                            maxAge: 1000*180
                        })
                    }
                    return res.redirect('/')
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            return res.render('login.ejs', {errors: errors.mapped(), old: req.body})
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
        }

        Usuarios.findByPk(req.session.userLogin.id)
        .then(user => {
            res.render("profileuser.ejs", {user, locals})
        })
    },
    profileUserChanges: (req, res) => {
        let errors = validationResult(req)       
        if(errors.isEmpty()){
            Usuarios.update({
                nombre: req.body.nombre ? req.body.nombre : nombre,
                apellido: req.body.apellido ? req.body.apellido : apellido,
                password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : password,
                email:  req.body.email ? req.body.email : email,
                avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
            }, {
                where: {id: req.session.userLogin.id}
            }).then( () => {
                res.redirect('/users/miperfil')
            })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}