/**
 * Configuración principal de Swagger para la API
 */

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Desafío Tripulaciones API',
            version: '1.0.0',
            description: 'API para gestión de flotas de vehículos',
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC',
            },
        },
        servers: [
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
                        'Token JWT obtenido del endpoint /api/v1/auth/login',
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
                    'Gestión de usuarios (conductores y jefe de flota)',
            },
            {
                name: 'Vehicles',
                description: 'Gestión de vehículos de la flota',
            },
            {
                name: 'Trips',
                description: 'Gestión de viajes y rutas',
            },
            {
                name: 'Tickets',
                description: 'Gestión de tickets y reportes',
            },
        ],
    },
    apis: ['./docs/schemas/*.js', './docs/paths/*.js'],
};

module.exports = swaggerConfig;
