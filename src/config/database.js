require('dotenv').config();
const { Sequelize } = require('sequelize');

const sslOptions =
    process.env.DB_SSL === 'true'
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: sslOptions,
        logging: false,
    }
);

// Función para probar la conexión a la base de datos
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente');
        return true;
    } catch (error) {
        console.error('Error al conectar con la base de datos:');
        console.error('Mensaje:', error.message);
        console.error('Código:', error.code);
        console.error('Detalles:', error);
        throw error;
    }
};

module.exports = { sequelize, testConnection };
