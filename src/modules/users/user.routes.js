const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getActiveDrivers,
    getUserStats,
} = require('./user.controller');
const {
    authenticateToken,
    requireAdmin,
    requireAdminOrEmpleado,
} = require('../../middlewares/authentication');
const {
    createUserValidation,
    updateUserValidation,
    userIdValidation,
    getUsersValidation,
} = require('./user.validation');

// Las validaciones están importadas desde user.validation.js
// Rutas públicas (solo para obtener conductores activos)
router.get('/drivers', getActiveDrivers);

// Rutas protegidas - Solo admin puede gestionar usuarios
router.get(
    '/',
    authenticateToken,
    requireAdmin,
    getUsersValidation,
    getAllUsers
);
router.get('/stats', authenticateToken, requireAdmin, getUserStats);
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
    requireAdminOrEmpleado,
    userIdValidation,
    getUserById
);
router.put(
    '/:id',
    authenticateToken,
    requireAdmin,
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

module.exports = router;
