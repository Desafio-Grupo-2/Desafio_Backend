const { body, param, query } = require('express-validator');

// Validación para obtener ticket por ID
const ticketIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID del ticket debe ser un número entero positivo'),
];

// Validación para obtener tickets por ruta
const rutaIdValidation = [
    param('id_ruta')
        .isInt({ min: 1 })
        .withMessage('El ID de la ruta debe ser un número entero positivo'),
];

// Validación para obtener tickets por tipo de carburante
const tipoCarburanteValidation = [
    param('tipo')
        .isLength({ min: 1, max: 100 })
        .withMessage('El tipo de carburante debe tener entre 1 y 100 caracteres')
        .trim(),
];

// Validación para crear ticket
const createTicketValidation = [
    body('id_ruta')
        .isInt({ min: 1 })
        .withMessage('El ID de la ruta debe ser un número entero positivo'),
    body('fecha')
        .optional()
        .isISO8601()
        .withMessage('La fecha debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    body('tipocarburante')
        .optional()
        .isLength({ max: 100 })
        .withMessage('El tipo de carburante no puede exceder 100 caracteres')
        .trim(),
    body('precioporlitro')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio por litro debe ser un número positivo'),
    body('coordenadas')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Las coordenadas no pueden exceder 200 caracteres')
        .trim(),
    body('litroscoche')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Los litros de coche deben ser un número positivo'),
    body('litrosbus')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Los litros de bus deben ser un número positivo'),
    body('importecoche_euros')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El importe de coche debe ser un número positivo'),
    body('importebus_euros')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El importe de bus debe ser un número positivo'),
    body('latitud')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('La latitud debe ser un número entre -90 y 90'),
    body('longitud')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('La longitud debe ser un número entre -180 y 180'),
    body('pdf')
        .optional()
        .isLength({ max: 500 })
        .withMessage('El PDF no puede exceder 500 caracteres')
        .trim(),
];

// Validación para actualizar ticket
const updateTicketValidation = [
    body('id_ruta')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID de la ruta debe ser un número entero positivo'),
    body('fecha')
        .optional()
        .isISO8601()
        .withMessage('La fecha debe estar en formato ISO 8601 (YYYY-MM-DD)'),
    body('tipocarburante')
        .optional()
        .isLength({ max: 100 })
        .withMessage('El tipo de carburante no puede exceder 100 caracteres')
        .trim(),
    body('precioporlitro')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio por litro debe ser un número positivo'),
    body('coordenadas')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Las coordenadas no pueden exceder 200 caracteres')
        .trim(),
    body('litroscoche')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Los litros de coche deben ser un número positivo'),
    body('litrosbus')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Los litros de bus deben ser un número positivo'),
    body('importecoche_euros')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El importe de coche debe ser un número positivo'),
    body('importebus_euros')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El importe de bus debe ser un número positivo'),
    body('latitud')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('La latitud debe ser un número entre -90 y 90'),
    body('longitud')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('La longitud debe ser un número entre -180 y 180'),
    body('pdf')
        .optional()
        .isLength({ max: 500 })
        .withMessage('El PDF no puede exceder 500 caracteres')
        .trim(),
];

// Validación para obtener todos los tickets
const getTicketsValidation = [
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
    query('tipocarburante')
        .optional()
        .isLength({ max: 100 })
        .withMessage('El tipo de carburante no puede exceder 100 caracteres')
        .trim(),
];

// Validación para obtener tickets por tipo de carburante
const getTicketsByTipoValidation = [
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
    ticketIdValidation,
    rutaIdValidation,
    tipoCarburanteValidation,
    createTicketValidation,
    updateTicketValidation,
    getTicketsValidation,
    getTicketsByTipoValidation,
    estadisticasValidation,
};
