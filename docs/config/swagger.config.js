/**
 * Configuración principal de Swagger para la API
 */

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Desafío Tripulaciones API',
            version: '1.0.0',
            description: 'API para gestión de usuarios y autenticación',
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC',
            },
        },
        servers: [
            {
                url: 'https://desafio-fullback.onrender.com',
                description: 'Servidor de producción (Render)',
            },
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        'Token JWT obtenido del endpoint /api/auth/login',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Endpoints de autenticación y autorización',
            },
            {
                name: 'Users',
                description:
                    'Gestión de usuarios (conductores y administradores)',
            },
            {
                name: 'Vehiculos',
                description: 'Gestión de vehículos',
            },
            {
                name: 'Rutas',
                description: 'Consulta de rutas almacenadas',
            },
            {
                name: 'Tickets',
                description: 'Consulta de tickets de combustible',
            },
        ],
    },
    apis: ['./docs/schemas/*.js', './docs/paths/*.js'],
};

module.exports = swaggerConfig;
