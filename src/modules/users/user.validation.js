const { body, param, query } = require('express-validator');

// Validaciones para crear usuario
const createUserValidation = [
    body('username')
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido')
        .isLength({ max: 255 })
        .withMessage('El email es demasiado largo'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial'),

    body('nombre')
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El nombre solo puede contener letras y espacios'),

    body('apellido')
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El apellido solo puede contener letras y espacios'),

    body('role')
        .isIn(['conductor', 'administrador'])
        .withMessage('Rol inválido. Debe ser "conductor" o "administrador"'),
];

// Validaciones para actualizar usuario
const updateUserValidation = [
    body('username')
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),

    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido')
        .isLength({ max: 255 })
        .withMessage('El email es demasiado largo'),

    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El nombre solo puede contener letras y espacios'),

    body('apellido')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El apellido solo puede contener letras y espacios'),

    body('role')
        .optional()
        .isIn(['conductor', 'administrador'])
        .withMessage('Rol inválido. Debe ser "conductor" o "administrador"'),

    body('active')
        .optional()
        .isBoolean()
        .withMessage('El estado activo debe ser verdadero o falso'),
];

// Validaciones para parámetros
const userIdValidation = [
    param('id').isInt({ min: 1 }).withMessage('ID de usuario inválido'),
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
        .isIn(['conductor', 'administrador'])
        .withMessage('Rol inválido. Debe ser "conductor" o "administrador"'),

    query('active')
        .optional()
        .isBoolean()
        .withMessage('El estado activo debe ser verdadero o falso'),

    query('search')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('La búsqueda debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-Z0-9@._\s]+$/)
        .withMessage('La búsqueda contiene caracteres no válidos'),
];

module.exports = {
    createUserValidation,
    updateUserValidation,
    userIdValidation,
    getUsersValidation,
};
