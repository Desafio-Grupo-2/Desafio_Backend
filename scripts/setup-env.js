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

// Función para leer el template y generar el contenido del .env
function generateEnvContent() {
    const templatePath = path.join(__dirname, '..', 'env', 'env.template');
    
    try {
        if (!fs.existsSync(templatePath)) {
            throw new Error('Archivo env.template no encontrado');
        }
        
        let templateContent = fs.readFileSync(templatePath, 'utf8');
        
        // Reemplazar el JWT_SECRET con uno generado automáticamente
        templateContent = templateContent.replace(
            'JWT_SECRET=tu_super_secreto_jwt_muy_seguro_aqui_cambiar_en_produccion',
            `JWT_SECRET=${generateJWTSecret()}`
        );
        
        return templateContent;
    } catch (error) {
        console.error('Error leyendo el template:', error.message);
        process.exit(1);
    }
}

// Función para crear el archivo .env
function createEnvFile() {
    const envPath = path.join(__dirname, '..', '.env');

    try {
        if (fs.existsSync(envPath)) {
            console.log('El archivo .env ya existe');
            console.log('¿Deseas sobrescribirlo? (y/N)');
            
            // Leer respuesta del usuario
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('', (answer) => {
                rl.close();
                
                if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                    // Crear el archivo .env usando el template
                    const envContent = generateEnvContent();
                    fs.writeFileSync(envPath, envContent);
                    console.log('Archivo .env sobrescrito exitosamente');
                    console.log('Ubicación:', envPath);
                    showNextSteps();
                } else {
                    console.log('Operación cancelada. El archivo .env no fue modificado.');
                }
            });
        } else {
            // Crear el archivo .env usando el template
            const envContent = generateEnvContent();
            fs.writeFileSync(envPath, envContent);
            console.log('Archivo .env creado exitosamente');
            console.log('Ubicación:', envPath);
            showNextSteps();
        }
    } catch (error) {
        console.error('Error creando el archivo .env:', error.message);
        process.exit(1);
    }
}

// Función para mostrar los próximos pasos
function showNextSteps() {
    console.log('');
    console.log('Próximos pasos:');
    console.log('1. Edita el archivo .env con tus configuraciones');
    console.log('2. Cambia la contraseña de la base de datos');
    console.log('3. Ajusta la URL de CORS si es necesario');
    console.log('4. Ejecuta: npm run db:migrate');
    console.log('5. Ejecuta: npm run db:seed');
    console.log('6. Ejecuta: npm run dev');
}

// Ejecutar
createEnvFile();
