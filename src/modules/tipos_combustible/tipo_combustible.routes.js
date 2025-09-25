const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdminOrConductor } = require('../../middlewares/authentication');
const { validateRequest } = require('../../middlewares/errors');

// Importar controlador
const combustibleController = require('./tipo_combustible.controller');

// Importar validaciones
const combustibleValidation = require('./tipo_combustible.validation');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/tipos-combustible - Obtener todos los tipos de combustible
router.get(
    '/',
    requireAdminOrConductor,
    ...combustibleValidation.getCombustiblesValidation,
    validateRequest,
    combustibleController.getAllTiposCombustible
);

// GET /api/tipos-combustible/:id - Obtener tipo de combustible por ID
router.get(
    '/:id',
    requireAdminOrConductor,
    ...combustibleValidation.combustibleIdValidation,
    validateRequest,
    combustibleController.getTipoCombustibleById
);

// GET /api/tipos-combustible/estacion/:id_estacion - Obtener combustibles por estación
router.get(
    '/estacion/:id_estacion',
    requireAdminOrConductor,
    ...combustibleValidation.estacionIdValidation,
    validateRequest,
    combustibleController.getCombustiblesByEstacion
);

// GET /api/tipos-combustible/precios/:tipo - Obtener precios por tipo de combustible
router.get(
    '/precios/:tipo',
    requireAdminOrConductor,
    ...combustibleValidation.tipoCombustibleValidation,
    ...combustibleValidation.getPreciosValidation,
    validateRequest,
    combustibleController.getPreciosByTipo
);

// GET /api/tipos-combustible/estadisticas/precios - Obtener estadísticas de precios
router.get(
    '/estadisticas/precios',
    requireAdminOrConductor,
    ...combustibleValidation.estadisticasValidation,
    validateRequest,
    combustibleController.getEstadisticasPrecios
);

module.exports = router;