const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware de autenticación
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token de acceso requerido',
            });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar usuario
        const user = await User.findByPk(decoded.userId, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido - usuario no encontrado',
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        // Agregar usuario a la request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido',
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado',
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error de autenticación',
            error: error.message,
        });
    }
};

// Middleware de autorización por roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Acceso no autorizado',
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para acceder a este recurso',
            });
        }

        next();
    };
};

// Middleware para verificar si es admin (jefe de flota)
const requireAdmin = authorize('admin');

// Middleware para verificar si es empleado (conductor)
const requireEmpleado = authorize('empleado');

// Middleware para verificar si es admin o empleado
const requireAdminOrEmpleado = authorize('admin', 'empleado');

module.exports = {
    authenticateToken,
    authorize,
    requireAdmin,
    requireEmpleado,
    requireAdminOrEmpleado,
};
