#!/usr/bin/env node

/**
 * Script para crear el archivo .env automáticamente
 * Uso: node scripts/setup-env.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Generar JWT secret aleatorio
const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Contenido del archivo .env
const envContent = `# ===========================================
# CONFIGURACIÓN DE BASE DE DATOS
# ===========================================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=desafio_tripulaciones
DB_USER=postgres
DB_PASSWORD=tu_password_aqui

# ===========================================
# CONFIGURACIÓN JWT
# ===========================================
JWT_SECRET=${generateJWTSecret()}
JWT_EXPIRES_IN=1h

# ===========================================
# CONFIGURACIÓN DEL SERVIDOR
# ===========================================
PORT=3000
NODE_ENV=development

# ===========================================
# CONFIGURACIÓN CORS
# ===========================================
CORS_ORIGIN=http://localhost:5173

# ===========================================
# CONFIGURACIÓN DE API
# ===========================================
API_VERSION=v1

# ===========================================
# CONFIGURACIÓN DE UPLOADS (OPCIONAL)
# ===========================================
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760


# ===========================================
# CONFIGURACIÓN DE LOGS
# ===========================================
LOG_LEVEL=info
LOG_FILE=./logs/app.log

`;

// Función para crear el archivo .env
function createEnvFile() {
    const envPath = path.join(__dirname, '..', '.env');

    try {
        if (fs.existsSync(envPath)) {
            console.log('⚠️  El archivo .env ya existe');
            console.log('¿Deseas sobrescribirlo? (y/N)');

            const backupPath = path.join(__dirname, '..', '.env.backup');
            fs.copyFileSync(envPath, backupPath);
            console.log(`📁 Backup creado en: ${backupPath}`);
        }

        // Crear el archivo .env
        fs.writeFileSync(envPath, envContent);
        console.log('Archivo .env creado exitosamente');
        console.log('Ubicación:', envPath);
        console.log('');
        console.log('Próximos pasos:');
        console.log('1. Edita el archivo .env con tus configuraciones');
        console.log('2. Cambia la contraseña de la base de datos');
        console.log('3. Ajusta la URL de CORS si es necesario');
        console.log('4. Ejecuta: npm run db:migrate');
        console.log('5. Ejecuta: npm run db:seed');
        console.log('6. Ejecuta: npm run dev');
    } catch (error) {
        console.error('Error creando el archivo .env:', error.message);
        process.exit(1);
    }
}

// Ejecutar
createEnvFile();
