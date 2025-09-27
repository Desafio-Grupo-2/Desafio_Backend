const { loadModels } = require('../models');

// Importar todos los seeders
const empresaSeeder = require('./01-empresa-seeder');
const usuariosSeeder = require('./02-usuarios-seeder');
const vehiculosSeeder = require('./03-vehiculos-seeder');
const rutasSeeder = require('./04-rutas-seeder');
const ticketsSeeder = require('./05-tickets-seeder');

const seeders = [
    { name: 'Empresa', seeder: empresaSeeder },
    { name: 'Usuarios', seeder: usuariosSeeder },
    { name: 'Vehículos', seeder: vehiculosSeeder },
    { name: 'Rutas', seeder: rutasSeeder },
    { name: 'Tickets', seeder: ticketsSeeder }
];

async function runSeeders() {
    try {
        console.log('Iniciando seeders para San Millán Bus');
        console.log('Ubicación: BBK Kuna, Bilbao, País Vasco');
        console.log('Sede: Urazurrutia Kalea, 3, Ibaiondo, 48003 Bilbao');
        console.log('Tipo: Flota de autobuses escolares y universitarios');
        console.log('Motorizaciones: Gasolina, Híbrido, Eléctrico');
        console.log('Hotspots: Gasolineras reales de Bilbao, Vitoria y San Sebastián');
        console.log('');

        // Cargar modelos
        await loadModels();

        // Ejecutar seeders en orden
        for (const { name, seeder } of seeders) {
            console.log(`Ejecutando seeder: ${name}`);
            await seeder.up();
            console.log(`${name} completado\n`);
        }

        console.log('Todos los seeders ejecutados exitosamente!');
        console.log('');
        console.log('Resumen de datos creados:');
        console.log('   1 Empresa: San Millán Bus (BBK Kuna, Bilbao)');
        console.log('   5 Usuarios: Luismi Kuna (jefe) + 5 conductores Bridge');
        console.log('   6 Autobuses: 2 Gasolina + 2 Híbridos + 2 Eléctricos');
        console.log('   6 Rutas: Desde cochera BBK Kuna a Vitoria y San Sebastián');
        console.log('   40 Tickets: Hotspots de gasolineras reales del País Vasco');
        console.log('');
        console.log('Credenciales de acceso:');
        console.log('   Jefe de flota: luismi.kuna / Admin123!');
        console.log('   Conductores: arantza.bridge, marjorie.bridge, jorge.bridge, david.bridge, iraitz.bridge / Conductor123!');
        console.log('');
        console.log('Hotspots de repostaje incluidos:');
        console.log('   Bilbao: Repsol, Cepsa, BP, Shell (BBK Kuna)');
        console.log('   Vitoria: Repsol, Cepsa (destino)');
        console.log('   San Sebastián: Repsol, BP, Shell (destino)');
        console.log('   Eléctricos: Puntos de carga BBK Kuna');
        console.log('');
        console.log('Rutas desde BBK Kuna:');
        console.log('   Escolares: Vitoria (124km), San Sebastián (138km)');
        console.log('   Universitarias: Vitoria (81km), San Sebastián (87km)');
        console.log('   Eléctricas: Locales Bilbao (25km, 37km)');

    } catch (error) {
        console.error('Error ejecutando seeders:', error);
        process.exit(1);
    }
}

async function rollbackSeeders() {
    try {
        console.log('Revirtiendo seeders...');
        
        await loadModels();

        // Ejecutar rollback en orden inverso
        for (let i = seeders.length - 1; i >= 0; i--) {
            const { name, seeder } = seeders[i];
            console.log(`Revirtiendo: ${name}`);
            await seeder.down();
        }

        console.log('Todos los seeders revertidos');
    } catch (error) {
        console.error('Error revirtiendo seeders:', error);
        process.exit(1);
    }
}

// Ejecutar según argumentos
const command = process.argv[2];

if (command === 'rollback') {
    rollbackSeeders();
} else {
    runSeeders();
}
