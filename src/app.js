const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { loadModels } = require('./models');
const errorHandler = require('./middlewares/errors');
const { generalLimiter } = require('./middlewares/rateLimiter');

// Importar rutas
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const vehiculoRoutes = require('./modules/vehiculos/vehiculo.routes');
const ticketRoutes = require('./modules/tickets/ticket.routes');
const rutaRoutes = require('./modules/rutas/ruta.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

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

app.use(generalLimiter);

// CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }

        // En producción, permitir el dominio de Render y otros dominios configurados
        const allowedOrigins = [
            'https://desafio-backend-qb7w.onrender.com',
            process.env.CORS_ORIGIN,
            'http://localhost:5173',
            'http://localhost:3000',
        ].filter(Boolean);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error('No permitido por CORS'));
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuración de Swagger
const swaggerConfig = require('../docs/config/swagger.config');
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/rutas', rutaRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'API de Gestión de Usuarios - Desafío Tripulaciones',
        version: '1.0.0',
        documentation: '/api-docs',
    });
});

app.use(errorHandler);

const startServer = async () => {
    try {
        // Probar conexión a la base de datos
        await testConnection();

        // Cargar modelos
        await loadModels();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en puerto ${PORT}`);
            console.log(
                `Documentación disponible en https://desafio-backend-qb7w.onrender.com/api-docs`
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;
