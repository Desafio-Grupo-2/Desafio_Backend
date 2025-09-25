const sequelize = require('../src/config/database');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a Postgres OK');
    } catch (err) {
        console.error('Error al conectar a Postgres:', err.message || err);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
})();
