const users = require('../data/users_db');
const {validationResult} = require('express-validator');

module.exports = {
    login : (req, res) => {
        res.render('login');
    },
    register : (req, res) => {
        res.render('register');
    },
    registerValidator : (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            res.redirect('/')
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