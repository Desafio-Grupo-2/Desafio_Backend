const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const TipoCombustible = sequelize.define(
    'TipoCombustible',
    {
        id_combustible: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_estacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estacion_servicio',
                key: 'id_estacion',
            },
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        codigo_postal: {
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
        precio_biodiesel: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_bioetanol: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gas_natural_comprimido: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gas_natural_licuado: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gases_licuados_petroleo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gasoleo_a: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gasoleo_b: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gasoleo_premium: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gasolina_95_e5: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gasolina_95_e5_premium: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio_gasolina_98_e5: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        column1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        'C.P.': {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'C.P.',
        },
        'Precio Biodiesel': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Biodiesel',
        },
        'Precio Bioetanol': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Bioetanol',
        },
        'Precio Gas Natural Comprimido': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gas Natural Comprimido',
        },
        'Precio Gas Natural Licuado': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gas Natural Licuado',
        },
        'Precio Gases licuados del petróleo': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gases licuados del petróleo',
        },
        'Precio Gasoleo A': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gasoleo A',
        },
        'Precio Gasoleo B': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gasoleo B',
        },
        'Precio Gasoleo Premium': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gasoleo Premium',
        },
        'Precio Gasolina 95 E5': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gasolina 95 E5',
        },
        'Precio Gasolina 95 E5 Premium': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gasolina 95 E5 Premium',
        },
        'Precio Gasolina 98 E5': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Precio Gasolina 98 E5',
        },
    },
    {
        tableName: 'tipo_combustible',
        timestamps: false,
    }
);

module.exports = TipoCombustible;
