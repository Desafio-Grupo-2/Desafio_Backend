const { body, param, query } = require('express-validator');

// Validación para obtener tipo de combustible por ID
const combustibleIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID del combustible debe ser un número entero positivo'),
];

// Validación para obtener combustibles por estación
const estacionIdValidation = [
    param('id_estacion')
        .isInt({ min: 1 })
        .withMessage('El ID de la estación debe ser un número entero positivo'),
];

// Validación para obtener precios por tipo
const tipoCombustibleValidation = [
    param('tipo')
        .isIn([
            'biodiesel',
            'bioetanol',
            'gas_natural_comprimido',
            'gas_natural_licuado',
            'gases_licuados_petroleo',
            'gasoleo_a',
            'gasoleo_b',
            'gasoleo_premium',
            'gasolina_95_e5',
            'gasolina_95_e5_premium',
            'gasolina_98_e5',
        ])
        .withMessage('Tipo de combustible no válido'),
];

// Validación para obtener todos los tipos de combustible
const getCombustiblesValidation = [
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
    query('fecha_desde')
        .optional()
        .isISO8601()
        .withMessage('La fecha desde debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    query('fecha_hasta')
        .optional()
        .isISO8601()
        .withMessage('La fecha hasta debe estar en formato ISO 8601 (YYYY-MM-DD)'),
];

// Validación para obtener precios por tipo
const getPreciosValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero positivo'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe ser un número entre 1 y 100'),
    query('fecha_desde')
        .optional()
        .isISO8601()
        .withMessage('La fecha desde debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    query('fecha_hasta')
        .optional()
        .isISO8601()
        .withMessage('La fecha hasta debe estar en formato ISO 8601 (YYYY-MM-DD)'),
];

// Validación para obtener estadísticas
const estadisticasValidation = [
    query('fecha_desde')
        .optional()
        .isISO8601()
        .withMessage('La fecha desde debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    query('fecha_hasta')
        .optional()
        .isISO8601()
        .withMessage('La fecha hasta debe estar en formato ISO 8601 (YYYY-MM-DD)'),
];

module.exports = {
    combustibleIdValidation,
    estacionIdValidation,
    tipoCombustibleValidation,
    getCombustiblesValidation,
    getPreciosValidation,
    estadisticasValidation,
};
