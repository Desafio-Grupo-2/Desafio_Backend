const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { syncModels } = require('./models');
const errorHandler = require('./middlewares/errors');
const { generalLimiter } = require('./middlewares/rateLimiter');
const {
    logFailedLogin,
    logRegistration,
    logPasswordChange,
    logUnauthorizedAccess,
    logCriticalErrors,
} = require('./middlewares/securityLogger');

// Importar rutas
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const vehicleRoutes = require('./modules/vehicles/vehicle.routes');
const tripRoutes = require('./modules/trips/trips.routes');
const ticketRoutes = require('./modules/tickets/ticket.routes');
const securityLogRoutes = require('./modules/security-logs/security-logs.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", 'data:', 'https:'],
            },
        },
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
    })
);

// Rate limiting general
app.use(generalLimiter);

// CORS
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    })
);

// Parser de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuración de Swagger
const swaggerConfig = require('../docs/config/swagger.config');
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de logging de seguridad
app.use(logFailedLogin);
app.use(logRegistration);
app.use(logPasswordChange);
app.use(logUnauthorizedAccess);
app.use(logCriticalErrors);

// Rutas de la API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/security-logs', securityLogRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'API de Gestión de Flotas - Desafío Tripulaciones',
        version: '1.0.0',
        documentation: '/api-docs',
    });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
    try {
        // Probar conexión a la base de datos
        await testConnection();

        // Sincronizar modelos
        await syncModels();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en puerto ${PORT}`);
            console.log(
                `📚 Documentación disponible en http://localhost:${PORT}/api-docs`
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;
