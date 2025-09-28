const { Vehiculo, Ticket, Ruta, Empresa } = require('./src/models');
const { Op } = require('sequelize');

async function verifyTickets() {
    try {
        console.log('=== Verificando tickets en la base de datos ===');
        
        // Contar tickets totales
        const totalTickets = await Ticket.count();
        console.log(`Total de tickets: ${totalTickets}`);
        
        // Contar tickets de 2024
        const tickets2024 = await Ticket.count({
            where: {
                fecha: {
                    [Op.gte]: '2024-01-01',
                    [Op.lte]: '2024-12-31'
                }
            }
        });
        console.log(`Tickets de 2024: ${tickets2024}`);
        
        // Contar por vehículo
        const vehiculos = await Vehiculo.findAll({
            include: [{
                model: Ruta,
                as: 'rutas',
                include: [{
                    model: Ticket,
                    as: 'tickets',
                    where: {
                        fecha: {
                            [Op.gte]: '2024-01-01',
                            [Op.lte]: '2024-12-31'
                        }
                    },
                    required: false
                }]
            }]
        });
        
        console.log('\nTickets por vehículo:');
        vehiculos.forEach(vehiculo => {
            const ticketsCount = vehiculo.rutas.reduce((total, ruta) => total + ruta.tickets.length, 0);
            console.log(`- ${vehiculo.matricula} (${vehiculo.motorizacion}): ${ticketsCount} tickets`);
        });
        
        // Verificar distribución mensual
        const monthlyStats = {};
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(2024, month, 1);
            const endDate = new Date(2024, month + 1, 0);
            
            const monthTickets = await Ticket.count({
                where: {
                    fecha: {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate
                    }
                }
            });
            
            monthlyStats[month] = monthTickets;
        }
        
        console.log('\nDistribución mensual:');
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        monthNames.forEach((name, index) => {
            console.log(`- ${name}: ${monthlyStats[index]} tickets`);
        });
        
        console.log('\n=== Verificación completada ===');
        
    } catch (error) {
        console.error('Error verificando tickets:', error);
    } finally {
        process.exit(0);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    verifyTickets();
}

module.exports = { verifyTickets };
