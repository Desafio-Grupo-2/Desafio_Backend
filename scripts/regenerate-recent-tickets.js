require('dotenv').config();
const { loadModels } = require('../src/models');
const ticketsRecientesSeeder = require('../src/seeders/08-tickets-recientes-seeder');

async function regenerateRecentTickets() {
    try {
        console.log('=== Regenerando tickets recientes ===');
        
        // Cargar modelos
        await loadModels();
        console.log('Modelos cargados correctamente');
        
        // Eliminar tickets recientes existentes
        console.log('Eliminando tickets recientes existentes...');
        await ticketsRecientesSeeder.down();
        
        // Generar nuevos tickets recientes
        console.log('Generando nuevos tickets recientes...');
        await ticketsRecientesSeeder.up();
        
        console.log('=== Tickets recientes regenerados correctamente ===');
        console.log('Se han generado ~1000 tickets para el último año');
        console.log('Los tickets incluyen importes realistas para autobuses escolares');
        
        process.exit(0);
    } catch (error) {
        console.error('Error regenerando tickets recientes:', error);
        process.exit(1);
    }
}

// Solo ejecutar si es el proceso principal
if (require.main === module) {
    regenerateRecentTickets();
}

module.exports = { regenerateRecentTickets };
