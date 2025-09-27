const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Importar modelos
const Usuario = require('../modules/users/user.model');
const Vehiculo = require('../modules/vehiculos/vehiculo.model');
const Ruta = require('../modules/rutas/ruta.model');
const Ticket = require('../modules/tickets/ticket.model');
const EstacionServicio = require('../modules/estaciones_servicio/estacion_servicio.model');
const TipoCombustible = require('../modules/tipos_combustible/tipo_combustible.model');
const Empresa = require('../modules/empresas/empresa.model');

// Definir relaciones
// Relaciones con Empresa (1:N)
Empresa.hasMany(Usuario, { foreignKey: 'id_empresa', as: 'usuarios' });
Usuario.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });

Empresa.hasMany(Vehiculo, { foreignKey: 'id_empresa', as: 'vehiculos' });
Vehiculo.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });

Empresa.hasMany(Ruta, { foreignKey: 'id_empresa', as: 'rutas' });
Ruta.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });

Empresa.hasMany(Ticket, { foreignKey: 'id_empresa', as: 'tickets' });
Ticket.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });

// Relaciones existentes
Usuario.hasMany(Vehiculo, { foreignKey: 'id_usuario', as: 'vehiculos' });
Vehiculo.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Vehiculo.hasMany(Ruta, { foreignKey: 'matricula', as: 'rutas' });
Ruta.belongsTo(Vehiculo, { foreignKey: 'matricula', as: 'vehiculo' });

Ruta.hasMany(Ticket, { foreignKey: 'id_ruta', as: 'tickets' });
Ticket.belongsTo(Ruta, { foreignKey: 'id_ruta', as: 'ruta' });

// Relaciones de estaciones de servicio comentadas temporalmente
// EstacionServicio.hasMany(Ticket, { foreignKey: 'id_estacion', as: 'tickets' });
// Ticket.belongsTo(EstacionServicio, { foreignKey: 'id_estacion', as: 'estacion' });

// EstacionServicio.hasMany(TipoCombustible, { foreignKey: 'id_estacion', as: 'combustibles' });
// TipoCombustible.belongsTo(EstacionServicio, { foreignKey: 'id_estacion', as: 'estacion' });

const loadModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente');
        console.log('Modelos cargados correctamente (sin sincronización)');
    } catch (error) {
        console.error('Error al cargar modelos:', error);
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
    Empresa,
    loadModels,
};
