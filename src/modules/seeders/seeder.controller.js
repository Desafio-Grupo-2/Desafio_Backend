const { loadModels } = require('../../models');
const ticketsRealistasSeeder = require('../../seeders/06-tickets-realistas-seeder');

const executeRealisticTicketsSeeder = async (req, res) => {
  try {
    console.log('🚌 Ejecutando seeder de tickets realistas en Render...');
    
    // Cargar modelos
    await loadModels();
    
    // Ejecutar el seeder
    await ticketsRealistasSeeder.up(null, null);
    
    console.log('✅ Seeder de tickets realistas ejecutado correctamente en Render');
    
    res.json({
      success: true,
      message: 'Seeder de tickets realistas ejecutado correctamente',
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
