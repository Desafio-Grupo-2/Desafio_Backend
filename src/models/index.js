const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Importar modelos
const Usuario = require('../modules/users/user.model');
const Vehiculo = require('../modules/vehiculos/vehiculo.model');
const Ruta = require('../modules/rutas/ruta.model');
const Ticket = require('../modules/tickets/ticket.model');
const EstacionServicio = require('../modules/estaciones_servicio/estacion_servicio.model');
const TipoCombustible = require('../modules/tipos_combustible/tipo_combustible.model');

// Definir relaciones
Usuario.hasMany(Vehiculo, { foreignKey: 'id_usuario', as: 'vehiculos' });
Vehiculo.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Vehiculo.hasMany(Ruta, { foreignKey: 'matricula', as: 'rutas' });
Ruta.belongsTo(Vehiculo, { foreignKey: 'matricula', as: 'vehiculo' });

Ruta.hasMany(Ticket, { foreignKey: 'id_ruta', as: 'tickets' });
Ticket.belongsTo(Ruta, { foreignKey: 'id_ruta', as: 'ruta' });

Ticket.hasMany(EstacionServicio, { foreignKey: 'id_ticket', as: 'estaciones' });
EstacionServicio.belongsTo(Ticket, { foreignKey: 'id_ticket', as: 'ticket' });

EstacionServicio.hasMany(TipoCombustible, { foreignKey: 'id_estacion', as: 'combustibles' });
TipoCombustible.belongsTo(EstacionServicio, { foreignKey: 'id_estacion', as: 'estacion' });

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
    Usuario,
    Vehiculo,
    Ruta,
    Ticket,
    EstacionServicio,
    TipoCombustible,
    syncModels,
};
