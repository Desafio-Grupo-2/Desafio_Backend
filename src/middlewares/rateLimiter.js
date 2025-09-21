const rateLimit = require('express-rate-limit');

// Rate limiter general
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP en 15 minutos
    message: {
        success: false,
        message:
            'Demasiadas solicitudes desde esta IP, intenta de nuevo en 15 minutos',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter específico para login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos de login por IP en 15 minutos
    message: {
        success: false,
        message: 'Demasiados intentos de login, intenta de nuevo en 15 minutos',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // No contar requests exitosos
});

// Rate limiter para registro
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 3, // máximo 3 registros por IP en 1 hora
    message: {
        success: false,
        message: 'Demasiados intentos de registro, intenta de nuevo en 1 hora',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter para cambio de contraseña
const passwordChangeLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 3, // máximo 3 intentos de cambio de contraseña por IP en 1 hora
    message: {
        success: false,
        message:
            'Demasiados intentos de cambio de contraseña, intenta de nuevo en 1 hora',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    generalLimiter,
    loginLimiter,
    registerLimiter,
    passwordChangeLimiter,
};
