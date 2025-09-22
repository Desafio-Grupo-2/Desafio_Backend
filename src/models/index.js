const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Importar modelos
const User = require('../modules/users/user.model');

const syncModels = async () => {
    try {
        await sequelize.sync({ alter: false });
        console.log('Modelos sincronizados correctamente');
    } catch (error) {
        console.error('Error al sincronizar modelos:', error);
        throw error;
    }
};

module.exports = {
    sequelize,
    User,
    syncModels,
};
