const fs = require('fs');
const path = require('path');

// Cargar manualmente todos los paths
const pathsDir = './docs/paths';
const pathFiles = fs.readdirSync(pathsDir);
const allPaths = {};

pathFiles.forEach(file => {
    try {
        const filePath = path.resolve(pathsDir, file);
        const paths = require(filePath);
        if (Object.keys(paths).length > 0) {
            Object.assign(allPaths, paths);
        }
    } catch (error) {
        // Ignorar errores
    }
});

const swaggerConfig = {
    openapi: '3.0.0',
    info: {
        title: 'Desafío Tripulaciones API',
        version: '1.0.0',
        description: 'API para gestión de usuarios y autenticación',
    },
    servers: [
        {
            url: 'https://desafio-fullback.onrender.com',
            description: 'Servidor de producción (Render)',
        },
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desarrollo',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{ bearerAuth: [] }],
    tags: [
        { name: 'Auth', description: 'Endpoints de autenticación' },
        { name: 'Users', description: 'Gestión de usuarios' },
        { name: 'Vehiculos', description: 'Gestión de vehículos' },
        { name: 'Rutas', description: 'Consulta de rutas' },
        { name: 'Tickets', description: 'Consulta de tickets' },
    ],
    paths: allPaths
};

module.exports = swaggerConfig;
