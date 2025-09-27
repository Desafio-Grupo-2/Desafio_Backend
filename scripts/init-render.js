require('dotenv').config();
const { loadModels } = require('../src/models');
const { sequelize } = require('../src/config/database');

// Importar seeders
const empresaSeeder = require('../src/seeders/01-empresa-seeder');
const usuariosSeeder = require('../src/seeders/02-usuarios-seeder');
const vehiculosSeeder = require('../src/seeders/03-vehiculos-seeder');
const rutasSeeder = require('../src/seeders/04-rutas-seeder');
const ticketsSeeder = require('../src/seeders/05-tickets-seeder');

async function initializeRender() {
    try {
        console.log('=== Inicializando base de datos en Render ===');
        
        // Cargar modelos
        await loadModels();
        console.log('Modelos cargados correctamente');
        
        // Sincronizar base de datos (crear tablas)
        await sequelize.sync({ force: true });
        console.log('Tablas creadas correctamente');
        
        // Ejecutar seeders
        console.log('Ejecutando seeders...');
        
        await empresaSeeder.up();
        console.log('Empresa creada');
        
        await usuariosSeeder.up();
        console.log('Usuarios creados');
        
        await vehiculosSeeder.up();
        console.log('Vehículos creados');
        
        await rutasSeeder.up();
        console.log('Rutas creadas');
        
        await ticketsSeeder.up();
        console.log('Tickets creados');
        
        console.log('=== Base de datos inicializada correctamente ===');
        console.log('Empresa: San Millán Bus');
        console.log('Usuarios: 6 (1 jefe + 5 conductores)');
        console.log('Vehículos: 6 (2 gasolina + 2 híbridos + 2 eléctricos)');
        console.log('Rutas: 6 (desde BBK Kuna)');
        console.log('Tickets: 40 (hotspots de gasolineras)');
        
        process.exit(0);
    } catch (error) {
        console.error('Error inicializando base de datos:', error);
        process.exit(1);
    }
}

// Solo ejecutar si es el proceso principal
if (require.main === module) {
    initializeRender();
}

module.exports = { initializeRender };
