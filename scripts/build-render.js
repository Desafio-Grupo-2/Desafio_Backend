#!/usr/bin/env node

// Script de build para Render
// Se ejecuta automáticamente después del build

const { exec } = require('child_process');
const path = require('path');

console.log('=== Ejecutando build para Render ===');

// Ejecutar inicialización de base de datos
const initCommand = 'npm run init-render';

exec(initCommand, (error, stdout, stderr) => {
    if (error) {
        console.error('Error ejecutando inicialización:', error);
        process.exit(1);
    }
    
    if (stderr) {
        console.error('Stderr:', stderr);
    }
    
    console.log('Stdout:', stdout);
    console.log('=== Build completado ===');
    process.exit(0);
});
