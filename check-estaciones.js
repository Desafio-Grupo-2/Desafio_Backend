const { EstacionServicio } = require('./src/models');

async function checkEstaciones() {
    try {
        console.log('=== Revisando estaciones de servicio ===');
        const estaciones = await EstacionServicio.findAll();
        
        console.log(`Estaciones encontradas: ${estaciones.length}`);
        
        if (estaciones.length === 0) {
            console.log('No hay estaciones. Creando estaciones de ejemplo...');
            
            const estacionesEjemplo = [
                { nombre: 'Repsol Centro', direccion: 'Calle Mayor 123', ciudad: 'Madrid' },
                { nombre: 'Cepsa Norte', direccion: 'Avenida Norte 45', ciudad: 'Madrid' },
                { nombre: 'BP Sur', direccion: 'Carretera Sur Km 5', ciudad: 'Madrid' },
                { nombre: 'Shell Este', direccion: 'Autopista Este Salida 12', ciudad: 'Madrid' },
                { nombre: 'Total Oeste', direccion: 'Carretera Oeste 78', ciudad: 'Madrid' }
            ];
            
            await EstacionServicio.bulkCreate(estacionesEjemplo);
            console.log('✅ Estaciones creadas');
        } else {
            estaciones.forEach(e => {
                console.log(`- ${e.nombre} (ID: ${e.id})`);
            });
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkEstaciones();
