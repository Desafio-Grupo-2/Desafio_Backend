const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

const envContent = `# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_SSL=false

# JWT Configuration
JWT_SECRET=${generateJWTSecret()}
JWT_EXPIRES_IN=1h

# Server Configuration
PORT=3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;

const envPath = path.join(__dirname, '..', '.env');

try {
    fs.writeFileSync(envPath, envContent);
    console.log('Archivo .env creado exitosamente');
    console.log('JWT_SECRET generado automáticamente');
    console.log('Recuerda configurar las variables de base de datos según tu entorno');
} catch (error) {
    console.error('Error al crear el archivo .env:', error.message);
}
