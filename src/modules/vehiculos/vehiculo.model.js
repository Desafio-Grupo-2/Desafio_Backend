const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Vehiculo = sequelize.define(
    'Vehiculo',
    {
        matricula: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuario',
                key: 'id_usuario',
            },
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        etiqueta: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        consumo_min: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        consumo_max: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        emisiones_min: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        emisiones_max: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        motorizacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        km: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        kw_minimo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        kw_maximo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'vehiculo',
        timestamps: false,
    }
);

module.exports = Vehiculo;
