const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Empresa = sequelize.define(
    'Empresa',
    {
        id_empresa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cif: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        activa: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'empresa',
        timestamps: false,
    }
);

module.exports = Empresa;
