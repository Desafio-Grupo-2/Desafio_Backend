const { body, param, query } = require('express-validator');

// Validación para obtener ruta por ID
const rutaIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID de la ruta debe ser un número entero positivo'),
];

// Validación para obtener rutas por vehículo
const matriculaValidation = [
    param('matricula')
        .isLength({ min: 1, max: 20 })
        .withMessage('La matrícula debe tener entre 1 y 20 caracteres')
        .trim(),
];

// Validación para obtener rutas por usuario
const usuarioIdValidation = [
    param('id_usuario')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero positivo'),
];

// Validación para crear ruta
const createRutaValidation = [
    body('matricula')
        .isLength({ min: 1, max: 20 })
        .withMessage('La matrícula debe tener entre 1 y 20 caracteres')
        .trim(),
    body('polyline')
        .optional()
        .isLength({ max: 10000 })
        .withMessage('El polyline no puede exceder 10000 caracteres')
        .trim(),
    body('paradas')
        .optional()
        .isLength({ max: 5000 })
        .withMessage('Las paradas no pueden exceder 5000 caracteres')
        .trim(),
    body('total_km')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El total de kilómetros debe ser un número positivo'),
    body('fecha_inicio')
        .optional()
        .isISO8601()
        .withMessage('La fecha de inicio debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    body('fecha_fin')
        .optional()
        .isISO8601()
        .withMessage('La fecha de fin debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    body('tiempo_total')
        .optional()
        .isLength({ max: 50 })
        .withMessage('El tiempo total no puede exceder 50 caracteres')
        .trim(),
    body('tiempos_paradas')
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Los tiempos de paradas no pueden exceder 2000 caracteres')
        .trim(),
    body('kms_paradas')
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Los kilómetros de paradas no pueden exceder 2000 caracteres')
        .trim(),
];

// Validación para actualizar ruta
const updateRutaValidation = [
    body('matricula')
        .optional()
        .isLength({ min: 1, max: 20 })
        .withMessage('La matrícula debe tener entre 1 y 20 caracteres')
        .trim(),
    body('polyline')
        .optional()
        .isLength({ max: 10000 })
        .withMessage('El polyline no puede exceder 10000 caracteres')
        .trim(),
    body('paradas')
        .optional()
        .isLength({ max: 5000 })
        .withMessage('Las paradas no pueden exceder 5000 caracteres')
        .trim(),
    body('total_km')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El total de kilómetros debe ser un número positivo'),
    body('fecha_inicio')
        .optional()
        .isISO8601()
        .withMessage('La fecha de inicio debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    body('fecha_fin')
        .optional()
        .isISO8601()
        .withMessage('La fecha de fin debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    body('tiempo_total')
        .optional()
        .isLength({ max: 50 })
        .withMessage('El tiempo total no puede exceder 50 caracteres')
        .trim(),
    body('tiempos_paradas')
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Los tiempos de paradas no pueden exceder 2000 caracteres')
        .trim(),
    body('kms_paradas')
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Los kilómetros de paradas no pueden exceder 2000 caracteres')
        .trim(),
];

// Validación para obtener todas las rutas
const getRutasValidation = [
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
    query('matricula')
        .optional()
        .isLength({ max: 20 })
        .withMessage('La matrícula no puede exceder 20 caracteres')
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

// Validación para obtener rutas por vehículo
const getRutasByVehiculoValidation = [
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

// Validación para obtener rutas por usuario
const getRutasByUsuarioValidation = [
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
    query('id_usuario')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero positivo'),
];

module.exports = {
    rutaIdValidation,
    matriculaValidation,
    usuarioIdValidation,
    createRutaValidation,
    updateRutaValidation,
    getRutasValidation,
    getRutasByVehiculoValidation,
    getRutasByUsuarioValidation,
    estadisticasValidation,
};
