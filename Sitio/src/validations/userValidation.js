const {body} = require('express-validator');

module.exports = [
    body('password')
        .notEmpty().withMessage('Debes rellenar el campo')
        .isLength({min: 2, max: 50}).withMessage('Debe contener entre 2 y 50 caractéres'),
    body('email')
        .notEmpty().withMessage('Debes rellenar el campo')
];