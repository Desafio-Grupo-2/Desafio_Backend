require('dotenv').config();
const { sequelize } = require('../src/models');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
    try {
        console.log('Ejecutando migraciones...');
        
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');
        
        // Leer archivos de migración
        const migrationsDir = path.join(__dirname, '../src/migrations');
        const migrationFiles = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.js'))
            .sort();
        
        console.log(`Encontradas ${migrationFiles.length} migraciones`);
        
        // Ejecutar cada migración
        for (const file of migrationFiles) {
            console.log(`Ejecutando migración: ${file}`);
            const migration = require(path.join(migrationsDir, file));
            await migration.up(sequelize.getQueryInterface(), sequelize.constructor);
            console.log(`Migración ${file} completada`);
        }
        
        console.log('Todas las migraciones ejecutadas exitosamente');
        
    } catch (error) {
        console.error('Error ejecutando migraciones:', error);
        throw error;
    } finally {
        await sequelize.close();
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    runMigrations()
        .then(() => {
            console.log('Proceso completado');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

module.exports = runMigrations;
