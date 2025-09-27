const { loadModels } = require('../../models');
const { Empresa, Ruta, Ticket } = require('../../models');
const { Op } = require('sequelize');

const executeRealisticTicketsSeeder = async (req, res) => {
  try {
    console.log('🚌 Ejecutando seeder de tickets realistas en Render...');
    
    // Cargar modelos
    await loadModels();
    
    // Buscar la empresa (por ID 1 o por CIF)
    let empresa = await Empresa.findByPk(1);
    if (!empresa) {
      empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
    }
    
    console.log('🔍 Empresa encontrada:', empresa ? `${empresa.nombre} (ID: ${empresa.id_empresa})` : 'No encontrada');
    
    if (!empresa) {
      throw new Error('Empresa no encontrada. Verifica que exista una empresa en la base de datos.');
    }
    
    // Buscar rutas de la empresa
    const rutas = await Ruta.findAll({ 
      where: { id_empresa: empresa.id_empresa } 
    });
    
    console.log('🔍 Rutas encontradas:', rutas.length);
    
    if (rutas.length === 0) {
      throw new Error('No se encontraron rutas para la empresa. Verifica que existan rutas.');
    }
    
    // Crear tickets realistas con fechas recientes (últimos 30 días)
    const now = new Date();
    const ticketsRealistas = [
      {
        id_ruta: rutas[0].id,
        fecha: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
        tipocarburante: 'Gasolina 95',
        precioporlitro: 150, // 1.50€/litro
        coordenadas: '43.2627,-2.9253',
        litroscoche: 0,
        litrosbus: 80,
        importecoche_euros: 0,
        importebus_euros: 12000, // 80 * 150 = 12000 céntimos = 120€
        latitud: 432627,
        longitud: -29253,
        pdf: 'ticket_repsol_bilbao_centro_001.pdf',
        'Precio por Litro': 150,
        id_empresa: empresa.id_empresa
      },
      {
        id_ruta: rutas[1] ? rutas[1].id : rutas[0].id,
        fecha: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
        tipocarburante: 'Gasolina 95',
        precioporlitro: 155, // 1.55€/litro
        coordenadas: '43.2627,-2.9253',
        litroscoche: 0,
        litrosbus: 90,
        importecoche_euros: 0,
        importebus_euros: 13950, // 90 * 155 = 13950 céntimos = 139.50€
        latitud: 432627,
        longitud: -29253,
        pdf: 'ticket_repsol_bilbao_centro_002.pdf',
        'Precio por Litro': 155,
        id_empresa: empresa.id_empresa
      },
      {
        id_ruta: rutas[2] ? rutas[2].id : rutas[0].id,
        fecha: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
        tipocarburante: 'Gasolina 95',
        precioporlitro: 160, // 1.60€/litro
        coordenadas: '43.2627,-2.9253',
        litroscoche: 0,
        litrosbus: 85,
        importecoche_euros: 0,
        importebus_euros: 13600, // 85 * 160 = 13600 céntimos = 136€
        latitud: 432627,
        longitud: -29253,
        pdf: 'ticket_repsol_bilbao_centro_003.pdf',
        'Precio por Litro': 160,
        id_empresa: empresa.id_empresa
      }
    ];
    
    // Insertar tickets
    await Ticket.bulkCreate(ticketsRealistas);
    
    console.log('✅ Creados 3 tickets realistas adicionales');
    
    res.json({
      success: true,
      message: 'Seeder de tickets realistas ejecutado correctamente',
      empresa: empresa.nombre,
      tickets_creados: ticketsRealistas.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error ejecutando seeder de tickets realistas:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error ejecutando seeder de tickets realistas',
      error: error.message
    });
  }
};

module.exports = {
  executeRealisticTicketsSeeder
};
