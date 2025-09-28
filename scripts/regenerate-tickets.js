#!/usr/bin/env node

// Script para regenerar tickets anuales en producción
// Útil cuando los tickets se han perdido o necesitan regenerarse

require('dotenv').config();
const { loadModels } = require('../src/models');

async function regenerateTickets() {
    try {
        console.log('=== Regenerando tickets anuales ===');
        
        // Cargar modelos
        await loadModels();
        console.log('Modelos cargados correctamente');
        
        // Importar y ejecutar seeder de tickets anuales
        const ticketsAnualesSeeder = require('../src/seeders/07-tickets-anuales-seeder');
        
        console.log('Ejecutando seeder de tickets anuales...');
        await ticketsAnualesSeeder.up();
        console.log('Tickets anuales regenerados correctamente');
        
        console.log('=== Proceso completado ===');
        console.log('Se han generado 624 tickets distribuidos a lo largo de 2024');
        console.log('52 tickets por mes (enero a diciembre)');
        console.log('Datos realistas con precios y consumo variables');
        
        process.exit(0);
    } catch (error) {
        console.error('Error regenerando tickets:', error);
        process.exit(1);
    }
}

// Solo ejecutar si es el proceso principal
if (require.main === module) {
    regenerateTickets();
}

module.exports = { regenerateTickets };
