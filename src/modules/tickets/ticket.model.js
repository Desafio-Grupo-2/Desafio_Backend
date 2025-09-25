const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Ticket = sequelize.define(
    'Ticket',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_ruta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ruta',
                key: 'id',
            },
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        tipocarburante: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        precioporlitro: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        coordenadas: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        litroscoche: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        litrosbus: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        importecoche_euros: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        importebus_euros: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        latitud: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        longitud: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pdf: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        'Precio por Litro': {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'Precio por Litro',
        },
    },
    {
        tableName: 'ticket',
        timestamps: false,
    }
);

module.exports = Ticket;
