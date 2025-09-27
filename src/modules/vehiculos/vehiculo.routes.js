const express = require('express');
const router = express.Router();
const {
    getAllVehiculos,
    getVehiculoByMatricula,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    getVehiculosByUsuario,
    getVehiculosByEmpresa,
    getVehiculosConCostesReales,
} = require('./vehiculo.controller');
const {
    authenticateToken,
    requireAdmin,
    requireAdminOrConductor,
} = require('../../middlewares/authentication');
const {
    getVehiculosValidation,
    matriculaValidation,
    userIdValidation,
    createVehiculoValidation,
    updateVehiculoValidation,
} = require('./vehiculo.validation');

// Rutas protegidas - Solo administradores pueden gestionar vehículos
router.get(
    '/',
    authenticateToken,
    requireAdmin,
    getVehiculosValidation,
    getAllVehiculos
);

router.post(
    '/',
    authenticateToken,
    requireAdmin,
    createVehiculoValidation,
    createVehiculo
);

router.get(
    '/:matricula',
    authenticateToken,
    requireAdminOrConductor,
    matriculaValidation,
    getVehiculoByMatricula
);

router.put(
    '/:matricula',
    authenticateToken,
    requireAdmin,
    matriculaValidation,
    updateVehiculoValidation,
    updateVehiculo
);

router.delete(
    '/:matricula',
    authenticateToken,
    requireAdmin,
    matriculaValidation,
    deleteVehiculo
);

// Ruta para obtener vehículos de un usuario específico
router.get(
    '/usuario/:id_usuario',
    authenticateToken,
    requireAdminOrConductor,
    userIdValidation,
    getVehiculosByUsuario
);

// Nueva ruta para obtener vehículos por empresa
router.get(
    '/empresa/:empresaId',
    authenticateToken,
    requireAdmin,
    getVehiculosValidation,
    getVehiculosByEmpresa
);

// Nueva ruta para obtener vehículos con costes reales basados en tickets
router.get(
    '/empresa/:id_empresa/costes-reales',
    authenticateToken,
    requireAdmin,
    getVehiculosConCostesReales
);

module.exports = router;
