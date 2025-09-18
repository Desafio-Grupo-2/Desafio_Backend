//PLACEHOLDER

// const Joi = require('joi');

// const signupSchema = Joi.object({
//     email: Joi.string().email().required().messages({
//         'string.empty': 'El email es obligatorio',
//         'string.email': 'El email no es válido',
//     }),

//     password: Joi.string().min(6).max(100).required().messages({
//         'string.empty': 'La contraseña es obligatoria',
//         'string.min': 'La contraseña debe tener al menos 6 caracteres',
//         'string.max': 'La contraseña no puede superar los 100 caracteres',
//     }),

//     userName: Joi.string().min(2).max(50).required().messages({
//         'string.empty': 'El nombre de usuario es obligatorio',
//         'string.min': 'El nombre de usuario debe tener al menos 2 caracteres',
//     }),

//     role: Joi.string().valid('user', 'admin').optional().messages({
//         'any.only': 'El rol debe ser "user" o "admin"',
//     }),
// });

// const loginSchema = Joi.object({
//     email: Joi.string().email().required().messages({
//         'string.empty': 'El email es obligatorio',
//         'string.email': 'El email no es válido',
//     }),

//     password: Joi.string().required().messages({
//         'string.empty': 'La contraseña es obligatoria',
//     }),
// });

// module.exports = {
//     signupSchema,
//     loginSchema,
// };
