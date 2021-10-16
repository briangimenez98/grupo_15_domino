const {body,check} = require('express-validator');

module.exports = [
    body("nombre")
        .notEmpty().withMessage("¡Debes poner el nombre del producto!")
        .isLength({min:2,max:100}).withMessage("Debe tener entre 2 y 100 caractéres."),
    body("descripcion")
        .notEmpty().withMessage("¡Debes escribir algo sobre el producto!")
        .isLength({max:200}).withMessage("¡La descripción es muy larga!"),
    body("image")
        .notEmpty().withMessage("Debes subir al menos una imagen."),
    body("categoria")
        .notEmpty().withMessage("Debes seleccionar una categoria."),
    check("talle")
        .isString("on").withMessage("Selecciona al menos un (1) talle."),
    body("genero")
        .notEmpty().withMessage("Selecciona un género."),
    body("precio")
        .notEmpty().withMessage("Debes poner algún precio.")
]