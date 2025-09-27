const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getUsersByEmpresa,
} = require('./user.controller');
const {
    authenticateToken,
    requireAdmin,
    requireAdminOrConductor,
} = require('../../middlewares/authentication');
const {
    createUserValidation,
    updateUserValidation,
    userIdValidation,
    getUsersValidation,
} = require('./user.validation');

// Rutas protegidas - Solo admin puede gestionar usuarios
router.get(
    '/',
    authenticateToken,
    requireAdmin,
    getUsersValidation,
    getAllUsers
);
router.post(
    '/',
    authenticateToken,
    requireAdmin,
    createUserValidation,
    createUser
);
router.get(
    '/:id',
    authenticateToken,
    requireAdminOrConductor,
    userIdValidation,
    getUserById
);
router.put(
    '/:id',
    authenticateToken,
    requireAdminOrConductor,
    userIdValidation,
    updateUserValidation,
    updateUser
);
router.delete(
    '/:id',
    authenticateToken,
    requireAdmin,
    userIdValidation,
    deleteUser
);
router.post(
    '/:id/toggle-status',
    authenticateToken,
    requireAdmin,
    userIdValidation,
    toggleUserStatus
);

// Nueva ruta para obtener usuarios por empresa
router.get(
    '/empresa/:empresaId',
    authenticateToken,
    requireAdmin,
    getUsersValidation,
    getUsersByEmpresa
);

module.exports = router;
