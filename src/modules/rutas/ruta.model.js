const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Ruta = sequelize.define(
    'Ruta',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'vehiculo',
                key: 'matricula',
            },
        },
        polyline: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        paradas: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        total_km: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        tiempo_total: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tiempos_paradas: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        kms_paradas: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'ruta',
        timestamps: false,
    }
);

module.exports = Ruta;
