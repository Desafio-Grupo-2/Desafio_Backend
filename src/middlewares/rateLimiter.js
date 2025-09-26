const rateLimit = require('express-rate-limit');
const { logRateLimitExceeded } = require('../utils/securityLogger');

const handler = (req, res, next, options) => {
    logRateLimitExceeded(
        req.ip,
        req.path,
        req.user || null,
        req.headers['user-agent']
    );
    res.status(options.statusCode).json(options.message);
};

// Rate limiter general
const generalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos por defecto
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests por defecto
    message: {
        success: false,
        message:
            'Demasiadas solicitudes desde esta IP, intenta de nuevo en 15 minutos',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler,
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
    skipSuccessfulRequests: true,
    handler,
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
    handler,
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
    handler,
});

module.exports = {
    generalLimiter,
    loginLimiter,
    registerLimiter,
    passwordChangeLimiter,
};
