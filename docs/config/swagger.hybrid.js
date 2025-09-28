const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

// Configuración para swagger-jsdoc (archivos con comentarios JSDoc)
const jsdocConfig = {
    definition: {
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
    },
    apis: [
        './docs/schemas/*.js',
        './docs/paths/auth.paths.js',
        './docs/paths/user.paths.js', 
        './docs/paths/vehiculo.paths.js',
        './docs/paths/empresa.paths.js',
        './docs/paths/ruta.paths.js',
        './docs/paths/ticket.paths.js'
    ],
};

// Cargar paths manuales (archivos que exportan objetos)
const pathsDir = './docs/paths';
const manualPathFiles = ['ruta.paths.js', 'ticket.paths.js'];
const manualPaths = {};

manualPathFiles.forEach(file => {
    try {
        const filePath = path.resolve(pathsDir, file);
        const paths = require(filePath);
        if (Object.keys(paths).length > 0) {
            Object.assign(manualPaths, paths);
        }
    } catch (error) {
        console.log(`Error cargando ${file}:`, error.message);
    }
});

// Generar especificación con swagger-jsdoc
let swaggerSpec;
try {
    swaggerSpec = swaggerJsdoc(jsdocConfig);
    console.log('swagger-jsdoc funcionando, paths encontrados:', Object.keys(swaggerSpec.paths || {}));
} catch (error) {
    console.log('Error con swagger-jsdoc:', error.message);
    swaggerSpec = jsdocConfig.definition;
}

// Cargar schemas manuales (rutas y tickets)
const rutaSchemas = require('../schemas/ruta.schemas.js');
const ticketSchemas = require('../schemas/ticket.schemas.js');

// Combinar paths de swagger-jsdoc con paths manuales
if (swaggerSpec.paths) {
    Object.assign(swaggerSpec.paths, manualPaths);
} else {
    swaggerSpec.paths = manualPaths;
}

// Combinar schemas de swagger-jsdoc con schemas manuales
if (swaggerSpec.components) {
    if (swaggerSpec.components.schemas) {
        Object.assign(swaggerSpec.components.schemas, rutaSchemas);
        Object.assign(swaggerSpec.components.schemas, ticketSchemas);
    } else {
        swaggerSpec.components.schemas = { ...rutaSchemas, ...ticketSchemas };
    }
} else {
    swaggerSpec.components = {
        schemas: { ...rutaSchemas, ...ticketSchemas }
    };
}

console.log('Paths finales:', Object.keys(swaggerSpec.paths || {}));
console.log('Schemas finales:', Object.keys(swaggerSpec.components?.schemas || {}));

module.exports = swaggerSpec;
