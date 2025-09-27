require('dotenv').config();
const { sequelize, loadModels } = require('../src/models');

async function syncDatabase() {
    try {
        console.log('Sincronizando base de datos...');
        
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');
        
        // Cargar todos los modelos
        await loadModels();
        console.log('Modelos cargados');
        
        // Sincronizar la base de datos (crear tablas si no existen)
        await sequelize.sync({ force: true });
        console.log('Base de datos sincronizada exitosamente');
        
    } catch (error) {
        console.error('Error sincronizando base de datos:', error);
        throw error;
    } finally {
        await sequelize.close();
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    syncDatabase()
        .then(() => {
            console.log('Proceso completado');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

module.exports = syncDatabase;
