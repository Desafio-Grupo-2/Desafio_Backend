const { logSecurityError } = require('../utils/securityLogger');

const handleValidationError = (err, res) => {
    let errors = err.errors.map(el => el.message);
    if (errors.length > 1) {
        const msgErr = errors.join(' || ');
        res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: msgErr,
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: errors,
        });
    }
};

const errorHandler = (err, req, res, next) => {
    // Log con solo información no sensible
    console.error('Error:', {
        message: err.message,
        name: err.name,
        status: err.status,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
    });

    // Log de errores críticos de seguridad
    if (err.status >= 500 || err.name === 'SequelizeConnectionError') {
        logSecurityError(err, {
            path: req.path,
            method: req.method,
            ip: req.ip,
        });
    }

    // Error de validación de Sequelize
    if (
        err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError'
    ) {
        return handleValidationError(err, res);
    }

    // Error de conexión a la base de datos
    if (err.name === 'SequelizeConnectionError') {
        return res.status(503).json({
            success: false,
            message: 'Error de conexión a la base de datos',
            error:
                process.env.NODE_ENV === 'development'
                    ? err.message
                    : 'Error interno del servidor',
        });
    }

    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Token inválido',
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expirado',
        });
    }

    // Error personalizado
    if (err.status) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            ...(err.code && { code: err.code }),
        });
    }

    // Error interno del servidor
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error:
            process.env.NODE_ENV === 'development'
                ? err.message
                : 'Algo salió mal',
    });
};

module.exports = errorHandler;
