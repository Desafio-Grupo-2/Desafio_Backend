const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdminOrConductor } = require('../../middlewares/authentication');
const { validateRequest } = require('../../middlewares/errors');

// Importar controlador
const estacionController = require('./estacion_servicio.controller');

// Importar validaciones
const estacionValidation = require('./estacion_servicio.validation');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/estaciones-servicio - Obtener todas las estaciones de servicio
router.get(
    '/',
    requireAdminOrConductor,
    validateRequest,
    estacionController.getAllEstacionesServicio
);

// GET /api/estaciones-servicio/:id - Obtener estación por ID
router.get(
    '/:id',
    requireAdminOrConductor,
    validateRequest,
    estacionController.getEstacionServicioById
);

module.exports = router;