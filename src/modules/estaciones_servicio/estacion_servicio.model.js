const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const EstacionServicio = sequelize.define(
    'EstacionServicio',
    {
        id_estacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_ticket: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'ticket',
                key: 'id',
            },
        },
        Rotulo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CoordenadaXDec: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CoordenadaYDec: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Direccion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CCAA: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Provincia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Municipio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Localidad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Fechapvp: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Horapvp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Horario: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        codpostal: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'estacion_servicio',
        timestamps: false,
    }
);

module.exports = EstacionServicio;
