const { body, param, query } = require('express-validator');

// Validación para obtener vehículos
const getVehiculosValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero mayor a 0'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe ser un número entre 1 y 100'),
    query('search')
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage('La búsqueda debe tener entre 1 y 100 caracteres'),
    query('marca')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('La marca debe tener entre 1 y 50 caracteres'),
    query('tipo')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('El tipo debe tener entre 1 y 50 caracteres'),
    query('id_usuario')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero mayor a 0'),
];

// Validación para matrícula
const matriculaValidation = [
    param('matricula')
        .isLength({ min: 1, max: 20 })
        .withMessage('La matrícula debe tener entre 1 y 20 caracteres')
        .matches(/^[A-Z0-9\s-]+$/i)
        .withMessage('La matrícula solo puede contener letras, números, espacios y guiones'),
];

// Validación para ID de usuario
const userIdValidation = [
    param('id_usuario')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero mayor a 0'),
];

// Validación para crear vehículo
const createVehiculoValidation = [
    body('matricula')
        .isLength({ min: 1, max: 20 })
        .withMessage('La matrícula debe tener entre 1 y 20 caracteres')
        .matches(/^[A-Z0-9\s-]+$/i)
        .withMessage('La matrícula solo puede contener letras, números, espacios y guiones'),
    body('id_usuario')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero mayor a 0'),
    body('marca')
        .isLength({ min: 1, max: 50 })
        .withMessage('La marca debe tener entre 1 y 50 caracteres')
        .trim(),
    body('modelo')
        .isLength({ min: 1, max: 50 })
        .withMessage('El modelo debe tener entre 1 y 50 caracteres')
        .trim(),
    body('etiqueta')
        .optional()
        .isLength({ min: 1, max: 20 })
        .withMessage('La etiqueta debe tener entre 1 y 20 caracteres')
        .trim(),
    body('tipo')
        .isLength({ min: 1, max: 50 })
        .withMessage('El tipo debe tener entre 1 y 50 caracteres')
        .trim(),
    body('consumo_min')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El consumo mínimo debe ser un número entero mayor o igual a 0'),
    body('consumo_max')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El consumo máximo debe ser un número entero mayor o igual a 0'),
    body('emisiones_min')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Las emisiones mínimas deben ser un número entero mayor o igual a 0'),
    body('emisiones_max')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Las emisiones máximas deben ser un número entero mayor o igual a 0'),
    body('motorizacion')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('La motorización debe tener entre 1 y 50 caracteres')
        .trim(),
    body('km')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Los kilómetros deben ser un número entero mayor o igual a 0'),
    body('kw_minimo')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Los kW mínimos deben ser un número entero mayor o igual a 0'),
    body('kw_maximo')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Los kW máximos deben ser un número entero mayor o igual a 0'),
];

// Validación para actualizar vehículo
const updateVehiculoValidation = [
    body('id_usuario')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero mayor a 0'),
    body('marca')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('La marca debe tener entre 1 y 50 caracteres')
        .trim(),
    body('modelo')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('El modelo debe tener entre 1 y 50 caracteres')
        .trim(),
    body('etiqueta')
        .optional()
        .isLength({ min: 1, max: 20 })
        .withMessage('La etiqueta debe tener entre 1 y 20 caracteres')
        .trim(),
    body('tipo')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('El tipo debe tener entre 1 y 50 caracteres')
        .trim(),
    body('consumo_min')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El consumo mínimo debe ser un número entero mayor o igual a 0'),
    body('consumo_max')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El consumo máximo debe ser un número entero mayor o igual a 0'),
    body('emisiones_min')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Las emisiones mínimas deben ser un número entero mayor o igual a 0'),
    body('emisiones_max')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Las emisiones máximas deben ser un número entero mayor o igual a 0'),
    body('motorizacion')
        .optional()
        .isLength({ min: 1, max: 50 })
        .withMessage('La motorización debe tener entre 1 y 50 caracteres')
        .trim(),
    body('km')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Los kilómetros deben ser un número entero mayor o igual a 0'),
    body('kw_minimo')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Los kW mínimos deben ser un número entero mayor o igual a 0'),
    body('kw_maximo')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Los kW máximos deben ser un número entero mayor o igual a 0'),
];

module.exports = {
    getVehiculosValidation,
    matriculaValidation,
    userIdValidation,
    createVehiculoValidation,
    updateVehiculoValidation,
};
