const { body } = require('express-validator');

// Validaciones de registro
const registerValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('firstName').notEmpty().trim().withMessage('El nombre es requerido'),
    body('lastName').notEmpty().trim().withMessage('El apellido es requerido'),
    body('phone').optional().isMobilePhone().withMessage('Teléfono inválido'),
    body('role')
        .optional()
        .isIn(['admin', 'empleado'])
        .withMessage('Rol inválido'),
];

// Validaciones de login
const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
];

// Validaciones de cambio de contraseña
const changePasswordValidation = [
    body('currentPassword')
        .notEmpty()
        .withMessage('La contraseña actual es requerida'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
];

module.exports = {
    registerValidation,
    loginValidation,
    changePasswordValidation,
};
