require('dotenv').config();
const { loadModels } = require('../src/models');
const { sequelize } = require('../src/config/database');
const { Op } = require('sequelize');

// Importar seeders
const empresaSeeder = require('../src/seeders/01-empresa-seeder');
const usuariosSeeder = require('../src/seeders/02-usuarios-seeder');
const vehiculosSeeder = require('../src/seeders/03-vehiculos-seeder');
const rutasSeeder = require('../src/seeders/04-rutas-seeder');
const ticketsSeeder = require('../src/seeders/05-tickets-seeder');
const ticketsAnualesSeeder = require('../src/seeders/07-tickets-anuales-seeder');
const ticketsRecientesSeeder = require('../src/seeders/08-tickets-recientes-seeder');

async function initializeRender() {
    try {
        console.log('=== Inicializando base de datos en Render ===');
        
        // Cargar modelos
        await loadModels();
        console.log('Modelos cargados correctamente');
        
        // Sincronizar base de datos (crear tablas si no existen)
        await sequelize.sync({ alter: true });
        console.log('Tablas sincronizadas correctamente');
        
        // Ejecutar seeders solo si no existen datos
        console.log('Verificando datos existentes...');
        
        const { Empresa, Usuario, Vehiculo, Ruta, Ticket } = require('../src/models');
        
        // Verificar si ya existen datos
        const empresaExists = await Empresa.count() > 0;
        const usuariosExists = await Usuario.count() > 0;
        const vehiculosExists = await Vehiculo.count() > 0;
        const ticketsAnualesExists = await Ticket.count({ where: { fecha: { [Op.gte]: new Date('2024-01-01'), [Op.lte]: new Date('2024-12-31') } } }) > 0;
        const ticketsRecientesExists = await Ticket.count({ where: { fecha: { [Op.gte]: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } } }) > 0;
        
        if (!empresaExists) {
            console.log('Creando empresa...');
            await empresaSeeder.up();
            console.log('Empresa creada');
        } else {
            console.log('Empresa ya existe, saltando...');
        }
        
        if (!usuariosExists) {
            console.log('Creando usuarios...');
            await usuariosSeeder.up();
            console.log('Usuarios creados');
        } else {
            console.log('Usuarios ya existen, saltando...');
        }
        
        if (!vehiculosExists) {
            console.log('Creando vehículos...');
            await vehiculosSeeder.up();
            console.log('Vehículos creados');
        } else {
            console.log('Vehículos ya existen, saltando...');
        }
        
        const rutasExists = await Ruta.count() > 0;
        if (!rutasExists) {
            console.log('Creando rutas...');
            await rutasSeeder.up();
            console.log('Rutas creadas');
        } else {
            console.log('Rutas ya existen, saltando...');
        }
        
        if (!ticketsAnualesExists) {
            console.log('Generando tickets anuales 2024...');
            await ticketsAnualesSeeder.up();
            console.log('Tickets anuales generados');
        } else {
            console.log('Tickets anuales ya existen, saltando...');
        }
        
        if (!ticketsRecientesExists) {
            console.log('Generando tickets recientes...');
            await ticketsRecientesSeeder.up();
            console.log('Tickets recientes generados');
        } else {
            console.log('Tickets recientes ya existen, saltando...');
        }
        
        console.log('=== Base de datos inicializada correctamente ===');
        console.log('Empresa: San Millán Bus');
        console.log('Usuarios: 6 (1 jefe + 5 conductores)');
        console.log('Vehículos: 6 (2 gasolina + 2 híbridos + 2 eléctricos)');
        console.log('Rutas: 6 (desde BBK Kuna)');
        console.log('Tickets: ~1700 (40 básicos + 624 anuales 2024 + ~1000 recientes)');
        
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
