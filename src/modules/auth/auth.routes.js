const express = require('express');
const router = express.Router();
const {
    register,
    login,
    adminLogin,
    getProfile,
    updateProfile,
    changePassword,
    logout,
} = require('./auth.controller');
const { authenticateToken } = require('../../middlewares/authentication');
const {
    loginLimiter,
    registerLimiter,
    passwordChangeLimiter,
} = require('../../middlewares/rateLimiter');
const {
    registerValidation,
    loginValidation,
    changePasswordValidation,
} = require('./auth.validation');

// Rutas públicas con rate limiting
router.post('/register', registerLimiter, registerValidation, register);
router.post('/login', loginLimiter, loginValidation, login);
router.post('/admin/login', loginLimiter, loginValidation, adminLogin);

// Rutas protegidas
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post(
    '/change-password',
    passwordChangeLimiter,
    authenticateToken,
    changePasswordValidation,
    changePassword
);
router.post('/logout', authenticateToken, logout);

module.exports = router;
