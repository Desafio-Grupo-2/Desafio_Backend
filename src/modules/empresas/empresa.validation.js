const { body, param, query } = require('express-validator');

// Validaciones para crear empresa
const createEmpresaValidation = [
    body('nombre')
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.&]+$/)
        .withMessage('El nombre contiene caracteres no válidos'),

    body('cif')
        .notEmpty()
        .trim()
        .isLength({ min: 9, max: 9 })
        .withMessage('El CIF debe tener exactamente 9 caracteres')
        .matches(/^[A-Z][0-9]{8}$/)
        .withMessage('El CIF debe tener formato válido (letra seguida de 8 números)'),

    body('direccion')
        .notEmpty()
        .trim()
        .isLength({ min: 10, max: 200 })
        .withMessage('La dirección debe tener entre 10 y 200 caracteres'),

    body('telefono')
        .optional()
        .trim()
        .isLength({ min: 9, max: 15 })
        .withMessage('El teléfono debe tener entre 9 y 15 caracteres')
        .matches(/^[0-9\s\-\+\(\)]+$/)
        .withMessage('El teléfono contiene caracteres no válidos'),

    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido')
        .isLength({ max: 255 })
        .withMessage('El email es demasiado largo'),

    body('sector')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El sector debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/)
        .withMessage('El sector solo puede contener letras, espacios y guiones'),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres'),

    body('activa')
        .optional()
        .isBoolean()
        .withMessage('El estado activo debe ser verdadero o falso'),
];

// Validaciones para actualizar empresa
const updateEmpresaValidation = [
    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.&]+$/)
        .withMessage('El nombre contiene caracteres no válidos'),

    body('cif')
        .optional()
        .trim()
        .isLength({ min: 9, max: 9 })
        .withMessage('El CIF debe tener exactamente 9 caracteres')
        .matches(/^[A-Z][0-9]{8}$/)
        .withMessage('El CIF debe tener formato válido (letra seguida de 8 números)'),

    body('direccion')
        .optional()
        .trim()
        .isLength({ min: 10, max: 200 })
        .withMessage('La dirección debe tener entre 10 y 200 caracteres'),

    body('telefono')
        .optional()
        .trim()
        .isLength({ min: 9, max: 15 })
        .withMessage('El teléfono debe tener entre 9 y 15 caracteres')
        .matches(/^[0-9\s\-\+\(\)]+$/)
        .withMessage('El teléfono contiene caracteres no válidos'),

    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido')
        .isLength({ max: 255 })
        .withMessage('El email es demasiado largo'),

    body('sector')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El sector debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/)
        .withMessage('El sector solo puede contener letras, espacios y guiones'),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres'),

    body('activa')
        .optional()
        .isBoolean()
        .withMessage('El estado activo debe ser verdadero o falso'),
];

// Validaciones para parámetros
const empresaIdValidation = [
    param('id').isInt({ min: 1 }).withMessage('ID de empresa inválido'),
];

// Validaciones para consultas
const getEmpresasValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero mayor a 0'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe ser un número entre 1 y 100'),

    query('activa')
        .optional()
        .isBoolean()
        .withMessage('El estado activo debe ser verdadero o falso'),

    query('sector')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El sector debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/)
        .withMessage('El sector contiene caracteres no válidos'),

    query('search')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('La búsqueda debe tener entre 2 y 100 caracteres')
        .matches(/^[a-zA-Z0-9@._\s\-]+$/)
        .withMessage('La búsqueda contiene caracteres no válidos'),
];

module.exports = {
    createEmpresaValidation,
    updateEmpresaValidation,
    empresaIdValidation,
    getEmpresasValidation,
};
