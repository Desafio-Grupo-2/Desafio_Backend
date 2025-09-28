const { Vehiculo, Ticket, Ruta, Empresa } = require('./src/models');
const { Sequelize } = require('sequelize');

async function regenerateTickets() {
    try {
        console.log('=== Regenerando tickets anuales ===');
        
        // Eliminar tickets existentes de 2024
        const deletedTickets = await Ticket.destroy({
            where: {
                fecha: {
                    [Sequelize.Op.gte]: '2024-01-01',
                    [Sequelize.Op.lt]: '2025-01-01'
                }
            }
        });
        
        console.log(`Tickets eliminados: ${deletedTickets}`);
        
        // Obtener todos los vehículos
        const vehiculos = await Vehiculo.findAll();
        console.log(`Vehículos encontrados: ${vehiculos.length}`);
        
        // Generar tickets para cada vehículo
        let totalTickets = 0;
        
        for (const vehiculo of vehiculos) {
            const ticketsPorVehiculo = await generateTicketsForVehicle(vehiculo);
            totalTickets += ticketsPorVehiculo;
            console.log(`Tickets generados para ${vehiculo.matricula}: ${ticketsPorVehiculo}`);
        }
        
        console.log(`Total de tickets generados: ${totalTickets}`);
        
    } catch (error) {
        console.error('Error regenerando tickets:', error);
    } finally {
        process.exit(0);
    }
}

async function generateTicketsForVehicle(vehiculo) {
    const tickets = [];
    const meses = [
        '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'
    ];
    
    // Generar 2-3 tickets por mes
    for (const mes of meses) {
        const ticketsEnMes = Math.floor(Math.random() * 2) + 2; // 2-3 tickets
        
        for (let i = 0; i < ticketsEnMes; i++) {
            const dia = Math.floor(Math.random() * 28) + 1; // 1-28
            const fecha = `2024-${mes}-${dia.toString().padStart(2, '0')}`;
            
            // Coste basado en el tipo de motorización
            let costeBase;
            switch (vehiculo.motorizacion) {
                case 'Diesel':
                    costeBase = 80 + Math.random() * 40; // 80-120€
                    break;
                case 'Gasolina':
                    costeBase = 70 + Math.random() * 30; // 70-100€
                    break;
                case 'Híbrido':
                    costeBase = 50 + Math.random() * 20; // 50-70€
                    break;
                default:
                    costeBase = 60 + Math.random() * 25; // 60-85€
            }
            
            tickets.push({
                fecha: fecha,
                coste: Math.round(costeBase * 100) / 100,
                id_empresa: vehiculo.id_empresa,
                id_ruta: null // Se asignará después
            });
        }
    }
    
    // Insertar tickets
    await Ticket.bulkCreate(tickets);
    return tickets.length;
}

// Ejecutar si se llama directamente
if (require.main === module) {
    regenerateTickets();
}

module.exports = { regenerateTickets };
