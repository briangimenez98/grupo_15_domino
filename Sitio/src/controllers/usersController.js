const users = require('../data/users_db');

module.exports = {
    login : (req, res) => {
        res.render('login');
    },
    register : (req, res) => {
        res.render('register');
    }
}