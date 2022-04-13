const { check, body } = require('express-validator');

module.exports = [
    check('title')
    .notEmpty()
    .withMessage('Debes ingresar el título de la película').bail()
    .isLength({ max: 500 })
    .withMessage('El título no puede tener más de 500 caracteres')
    .withMessage('Ingresa un nombre válido'),

    check('rating')
    .notEmpty()
    .withMessage('Debes ingresar el rating de la película'),

    /* check('awards')
    .notEmpty()
    */

    check('release_date')
    .notEmpty()
    .withMessage('Ingresa una fecha de estreno')
    .isDate()
    .withMessage('Debes ingresar un formato válido'),

    check('length')
    .notEmpty()
    .withMessage('Ingresa la duración')
       
]