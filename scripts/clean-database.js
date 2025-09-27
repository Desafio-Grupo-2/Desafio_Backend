const { sequelize } = require('../src/models');

async function cleanDatabase() {
    try {
        console.log('Limpiando base de datos...');
        
        // Desactivar restricciones de clave foránea temporalmente
        await sequelize.query('SET session_replication_role = replica;');
        
        // Limpiar tablas en orden inverso de dependencias
        await sequelize.query('TRUNCATE TABLE tickets CASCADE;');
        await sequelize.query('TRUNCATE TABLE rutas CASCADE;');
        await sequelize.query('TRUNCATE TABLE vehiculos CASCADE;');
        await sequelize.query('TRUNCATE TABLE usuarios CASCADE;');
        await sequelize.query('TRUNCATE TABLE empresa CASCADE;');
        await sequelize.query('TRUNCATE TABLE estaciones_servicio CASCADE;');
        await sequelize.query('TRUNCATE TABLE tipos_combustible CASCADE;');
        
        // Reactivar restricciones de clave foránea
        await sequelize.query('SET session_replication_role = DEFAULT;');
        
        console.log('Base de datos limpiada exitosamente');
        
    } catch (error) {
        console.error('Error limpiando base de datos:', error);
        throw error;
    } finally {
        await sequelize.close();
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    cleanDatabase()
        .then(() => {
            console.log('Proceso completado');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

module.exports = cleanDatabase;
