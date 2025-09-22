const { body, param, query } = require('express-validator');

// Validaciones para crear usuario
const createUserValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
            'La contraseña debe contener al menos una letra minúscula, una mayúscula y un número'
        ),

    body('firstName')
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

    body('lastName')
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres'),

    body('phone')
        .optional()
        .isMobilePhone('any')
        .withMessage('Teléfono inválido'),

    body('role')
        .isIn(['admin', 'empleado'])
        .withMessage('Rol inválido. Debe ser "admin" o "empleado"'),

    body('profileImage')
        .optional()
        .isURL()
        .withMessage('La imagen de perfil debe ser una URL válida'),
];

// Validaciones para actualizar usuario
const updateUserValidation = [
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),

    body('firstName')
        .optional()
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

    body('lastName')
        .optional()
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres'),

    body('phone')
        .optional()
        .isMobilePhone('any')
        .withMessage('Teléfono inválido'),

    body('role')
        .optional()
        .isIn(['admin', 'empleado'])
        .withMessage('Rol inválido. Debe ser "admin" o "empleado"'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('El estado activo debe ser verdadero o falso'),

    body('profileImage')
        .optional()
        .isURL()
        .withMessage('La imagen de perfil debe ser una URL válida'),
];

// Validaciones para parámetros
const userIdValidation = [
    param('id').isUUID().withMessage('ID de usuario inválido'),
];

// Validaciones para consultas
const getUsersValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero mayor a 0'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe ser un número entre 1 y 100'),

    query('role')
        .optional()
        .isIn(['admin', 'empleado'])
        .withMessage('Rol inválido. Debe ser "admin" o "empleado"'),

    query('isActive')
        .optional()
        .isBoolean()
        .withMessage('El estado activo debe ser verdadero o falso'),

    query('search')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('La búsqueda debe tener entre 2 y 100 caracteres'),
];

module.exports = {
    createUserValidation,
    updateUserValidation,
    userIdValidation,
    getUsersValidation,
};
