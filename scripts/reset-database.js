const { sequelize } = require('../src/config/database');
const fs = require('fs');
const path = require('path');

const resetDatabase = async () => {
    try {
        console.log('🔄 Iniciando reset completo de la base de datos...\n');
        
        // PASO 1: DROP de todas las tablas y tipos
        console.log('🗑️  PASO 1: Eliminando todas las tablas y tipos...');
        
        // Verificar qué tablas existen
        const [tables] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
        `);
        
        if (tables.length > 0) {
            console.log(`   📋 Tablas encontradas: ${tables.map(t => t.table_name).join(', ')}`);
            
            // Eliminar todas las tablas
            for (const table of tables) {
                console.log(`   🗑️  Eliminando tabla: ${table.table_name}`);
                await sequelize.query(`DROP TABLE IF EXISTS "${table.table_name}" CASCADE`);
            }
        } else {
            console.log('   ✅ No hay tablas para eliminar');
        }
        
        // Eliminar tipos ENUM si existen
        const [enumTypes] = await sequelize.query(`
            SELECT typname 
            FROM pg_type 
            WHERE typtype = 'e' 
            AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
        `);
        
        if (enumTypes.length > 0) {
            console.log(`Tipos ENUM encontrados: ${enumTypes.map(e => e.typname).join(', ')}`);
            
            for (const enumType of enumTypes) {
                console.log(`Eliminando tipo ENUM: ${enumType.typname}`);
                await sequelize.query(`DROP TYPE IF EXISTS "${enumType.typname}" CASCADE`);
            }
        } else {
            console.log('   No hay tipos ENUM para eliminar');
        }
        
        console.log('   Drop completado\n');
        
        // PASO 2: Ejecutar migraciones
        console.log('PASO 2: Ejecutando migraciones...');
        
        const migrationPath = path.join(__dirname, '../src/migrations/20250923155904-create-initial-tables.js');
        const migration = require(migrationPath);
        
        await migration.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log(' Migración ejecutada exitosamente\n');
        
        // PASO 3: Ejecutar seeders
        console.log('PASO 3: Ejecutando seeders...');
        
        const seederPath = path.join(__dirname, '../src/seeders/2509161925-initial-data.js');
        const seeder = require(seederPath);
        
        await seeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log(' Seeder ejecutado exitosamente\n');
        
        // PASO 4: Verificar resultado final
        console.log('🔍 PASO 4: Verificando resultado final...');
        
        // Verificar tablas
        const [finalTables] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
        `);
        
        console.log(`Tablas creadas: ${finalTables.map(t => t.table_name).join(', ')}`);
        
        // Verificar usuarios
        const [users] = await sequelize.query(`
            SELECT email, first_name, last_name, role, is_active 
            FROM users 
            ORDER BY created_at
        `);
        
        console.log(`Usuarios creados: ${users.length}`);
        users.forEach(user => {
            console.log(`      - ${user.email} (${user.first_name} ${user.last_name}) - ${user.role}`);
        });
        
        console.log('\n¡Reset de base de datos completado exitosamente!');
        console.log('\n Resumen:');
        console.log(`   - Tablas: ${finalTables.length}`);
        console.log(`   - Usuarios: ${users.length}`);
        console.log('   - Estado: Listo para desarrollo');
        
        console.log('\nCredenciales de prueba:');
        console.log('   - Admin: admin@tripulaciones.com / admin123');
        console.log('   - Jefe: jefe.flota@empresademo.com / admin123');
        console.log('   - Empleado: jon.uranga@empresademo.com / admin123');
        
    } catch (error) {
        console.error('❌ Error durante el reset de la base de datos:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
};

// Ejecutar el reset
resetDatabase();
