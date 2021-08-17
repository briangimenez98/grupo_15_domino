const {body} = require('express-validator')

module.exports = [
    body('email').isEmail().withMessage('Debes poner tu email.'),
    body('password').isLength({min: 6, max: 15}).withMessage('La contraseña debe tener entre 6 y 15 caracteres.'),
];