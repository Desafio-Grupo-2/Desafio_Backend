const express = require('express');
const router = express.Router();
const {
    getAllEmpresas,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    toggleEmpresaStatus,
    getEmpresaStats,
} = require('./empresa.controller');
const {
    authenticateToken,
    requireAdmin,
} = require('../../middlewares/authentication');
const {
    createEmpresaValidation,
    updateEmpresaValidation,
    empresaIdValidation,
    getEmpresasValidation,
} = require('./empresa.validation');

// Rutas públicas - Cualquiera puede ver empresas
router.get(
    '/',
    getEmpresasValidation,
    getAllEmpresas
);

router.get(
    '/:id',
    empresaIdValidation,
    getEmpresaById
);

// Rutas protegidas - Solo admin puede gestionar empresas
router.post(
    '/',
    authenticateToken,
    requireAdmin,
    createEmpresaValidation,
    createEmpresa
);

router.put(
    '/:id',
    authenticateToken,
    requireAdmin,
    empresaIdValidation,
    updateEmpresaValidation,
    updateEmpresa
);

router.delete(
    '/:id',
    authenticateToken,
    requireAdmin,
    empresaIdValidation,
    deleteEmpresa
);

router.post(
    '/:id/toggle-status',
    authenticateToken,
    requireAdmin,
    empresaIdValidation,
    toggleEmpresaStatus
);

router.get(
    '/:id/stats',
    authenticateToken,
    requireAdmin,
    empresaIdValidation,
    getEmpresaStats
);

module.exports = router;
