const { Vehiculo, Ruta, Ticket, EstacionServicio } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log('Generando tickets recientes (último año)...');
      
      // Obtener todos los vehículos
      const vehiculos = await Vehiculo.findAll({
        include: [{
          model: Ruta,
          as: 'rutas'
        }]
      });
      
      if (vehiculos.length === 0) {
        console.log('No hay vehículos disponibles para generar tickets');
        return;
      }
      
      // Obtener estaciones de servicio
      let estaciones = await EstacionServicio.findAll();
      if (estaciones.length === 0) {
        console.log('No hay estaciones de servicio. Creando estaciones de ejemplo...');
        const estacionesEjemplo = [
          { nombre: 'Repsol Centro', direccion: 'Calle Mayor 123', ciudad: 'Madrid' },
          { nombre: 'Cepsa Norte', direccion: 'Avenida Norte 45', ciudad: 'Madrid' },
          { nombre: 'BP Sur', direccion: 'Carretera Sur Km 5', ciudad: 'Madrid' },
          { nombre: 'Shell Este', direccion: 'Autopista Este Salida 12', ciudad: 'Madrid' },
          { nombre: 'Total Oeste', direccion: 'Carretera Oeste 78', ciudad: 'Madrid' }
        ];
        
        await EstacionServicio.bulkCreate(estacionesEjemplo);
        estaciones = await EstacionServicio.findAll();
        console.log(`✅ Creadas ${estaciones.length} estaciones de servicio`);
      }
      
      const tickets = [];
      const ahora = new Date();
      
      // Generar tickets para los últimos 12 meses
      for (let mes = 0; mes < 12; mes++) {
        const fechaBase = new Date(ahora.getFullYear(), ahora.getMonth() - mes, 1);
        const diasEnMes = new Date(fechaBase.getFullYear(), fechaBase.getMonth() + 1, 0).getDate();
        
        for (const vehiculo of vehiculos) {
          if (vehiculo.rutas.length === 0) continue;
          
          // Generar entre 15-25 tickets por vehículo por mes
          const numTickets = Math.floor(Math.random() * 11) + 15;
          
          for (let i = 0; i < numTickets; i++) {
            const dia = Math.floor(Math.random() * diasEnMes) + 1;
            const fecha = new Date(fechaBase.getFullYear(), fechaBase.getMonth(), dia);
            
            // Solo generar tickets en días laborables (lunes a viernes)
            if (fecha.getDay() >= 1 && fecha.getDay() <= 5) {
              const ruta = vehiculo.rutas[Math.floor(Math.random() * vehiculo.rutas.length)];
              const estacion = estaciones[Math.floor(Math.random() * estaciones.length)];
              
              // Calcular importes basados en el tipo de vehículo y ruta
              const kmRuta = parseFloat(ruta.total_km) || 50;
              
              // Consumo más realista para autobuses escolares
              let consumoPor100km;
              let precioLitro;
              
              if (vehiculo.motorizacion === 'Eléctrico') {
                consumoPor100km = 35; // kWh por 100km para autobús eléctrico
                precioLitro = 0.25; // €/kWh
              } else if (vehiculo.motorizacion === 'Híbrido') {
                consumoPor100km = 12; // litros por 100km para híbrido
                precioLitro = 1.7; // €/litro
              } else {
                consumoPor100km = 18; // litros por 100km para gasolina
                precioLitro = 1.7; // €/litro
              }
              
              const litrosConsumidos = (kmRuta * consumoPor100km) / 100;
              const importeBase = litrosConsumidos * precioLitro;
              
              // Variar el importe ±15%
              const variacion = (Math.random() - 0.5) * 0.3;
              const importeFinal = Math.max(importeBase * (1 + variacion), 15); // Mínimo 15€ por repostaje
              
              tickets.push({
                id_ruta: ruta.id,
                id_estacion: estacion.id,
                fecha: fecha,
                importecoche_euros: Math.round(importeFinal * 100) / 100,
                importebus_euros: Math.round(importeFinal * 0.1 * 100) / 100, // 10% adicional para bus
                litros_consumidos: Math.round(litrosConsumidos * 100) / 100,
                precio_litro: Math.round(precioLitro * 100) / 100,
                created_at: new Date(),
                updated_at: new Date()
              });
            }
          }
        }
      }
      
      if (tickets.length > 0) {
        await Ticket.bulkCreate(tickets);
        console.log(`✅ Generados ${tickets.length} tickets recientes`);
      } else {
        console.log('No se generaron tickets (no hay días laborables en el período)');
      }
      
    } catch (error) {
      console.error('Error generando tickets recientes:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log('Eliminando tickets recientes...');
      
      // Eliminar tickets de los últimos 12 meses
      const haceUnAno = new Date();
      haceUnAno.setFullYear(haceUnAno.getFullYear() - 1);
      
      await Ticket.destroy({
        where: {
          fecha: {
            [Op.gte]: haceUnAno
          }
        }
      });
      
      console.log('✅ Tickets recientes eliminados');
    } catch (error) {
      console.error('Error eliminando tickets recientes:', error);
      throw error;
    }
  }
};
