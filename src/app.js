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
const empresaRoutes = require('./modules/empresas/empresa.routes');
const prediccionRoutes = require('./modules/prediccion/prediccion.routes');
const seederRoutes = require('./modules/seeders/seeder.routes');

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
    origin: [
        'http://localhost:5173',
        'https://localhost:5173',
        'http://localhost:3000',
        'https://localhost:3000',
        'https://desafio-fullback.onrender.com',
        'https://desafio-backend-qb7w.onrender.com',
        'https://desafio-frontend-deploy-umber.vercel.app',
        process.env.CORS_ORIGIN,
    ].filter(Boolean),
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuración de Swagger
const swaggerConfig = require('../docs/config/swagger.hybrid');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/rutas', rutaRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/prediccion', prediccionRoutes);
app.use('/api/seeders', seederRoutes);

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
                `Documentación disponible en https://desafio-fullback.onrender.com/api-docs`
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:');
        console.error('Mensaje:', error.message);
        console.error('Código:', error.code);
        console.error('Detalles:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
