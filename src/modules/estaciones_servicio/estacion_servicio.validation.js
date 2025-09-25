const { body, param, query } = require('express-validator');

// Validación para obtener estación por ID
const estacionIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID de la estación debe ser un número entero positivo'),
];

// Validación para obtener estaciones por provincia
const provinciaValidation = [
    param('provincia')
        .isLength({ min: 1, max: 100 })
        .withMessage('La provincia debe tener entre 1 y 100 caracteres')
        .trim(),
];

// Validación para obtener estaciones por municipio
const municipioValidation = [
    param('municipio')
        .isLength({ min: 1, max: 100 })
        .withMessage('El municipio debe tener entre 1 y 100 caracteres')
        .trim(),
];

// Validación para obtener estaciones cercanas
const coordenadasValidation = [
    query('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage('La latitud debe ser un número entre -90 y 90'),
    query('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage('La longitud debe ser un número entre -180 y 180'),
    query('radius')
        .optional()
        .isFloat({ min: 0.1, max: 100 })
        .withMessage('El radio debe ser un número entre 0.1 y 100 km'),
];

// Validación para obtener todas las estaciones
const getEstacionesValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero positivo'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe ser un número entre 1 y 100'),
    query('search')
        .optional()
        .isLength({ max: 200 })
        .withMessage('La búsqueda no puede exceder 200 caracteres')
        .trim(),
    query('provincia')
        .optional()
        .isLength({ max: 100 })
        .withMessage('La provincia no puede exceder 100 caracteres')
        .trim(),
    query('municipio')
        .optional()
        .isLength({ max: 100 })
        .withMessage('El municipio no puede exceder 100 caracteres')
        .trim(),
    query('ccaa')
        .optional()
        .isLength({ max: 100 })
        .withMessage('La CCAA no puede exceder 100 caracteres')
        .trim(),
];

module.exports = {
    estacionIdValidation,
    provinciaValidation,
    municipioValidation,
    coordenadasValidation,
    getEstacionesValidation,
};
