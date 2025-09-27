const { loadModels } = require('./src/models');
const { Ticket, Empresa } = require('./src/models');
const { Op } = require('sequelize');

async function checkTickets() {
  try {
    await loadModels();
    
    const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
    console.log('Empresa encontrada:', empresa ? empresa.nombre : 'No encontrada');
    
    if (empresa) {
      const totalTickets = await Ticket.count({ where: { id_empresa: empresa.id_empresa } });
      console.log('Total tickets en BD:', totalTickets);
      
      const recentTickets = await Ticket.findAll({
        where: { 
          id_empresa: empresa.id_empresa,
          fecha: { [Op.gte]: new Date('2024-01-20T00:00:00') }
        },
        order: [['fecha', 'DESC']],
        limit: 5
      });
      
      console.log('Tickets recientes encontrados:', recentTickets.length);
      recentTickets.forEach(ticket => {
        const importe = ticket.importebus_euros / 100;
        console.log(`- ${ticket.fecha.toISOString().split('T')[0]}: ${importe}€ por ${ticket.litrosbus}L`);
      });
      
      // Verificar tickets con importes altos
      const highValueTickets = await Ticket.findAll({
        where: { 
          id_empresa: empresa.id_empresa,
          importebus_euros: { [Op.gt]: 10000 } // Más de 100€
        },
        order: [['importebus_euros', 'DESC']],
        limit: 3
      });
      
      console.log('Tickets de alto valor encontrados:', highValueTickets.length);
      highValueTickets.forEach(ticket => {
        const importe = ticket.importebus_euros / 100;
        console.log(`- ${importe}€ por ${ticket.litrosbus}L (${ticket.fecha.toISOString().split('T')[0]})`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkTickets();
