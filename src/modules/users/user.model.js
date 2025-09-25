const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const bcrypt = require('bcryptjs');
const Usuario = sequelize.define(
    'Usuario',
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'conductor',
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: 'usuario',
        timestamps: false, // Desactivar createdAt y updatedAt automáticos
        hooks: {
            // Hashear contraseñas solo para usuarios nuevos
            beforeCreate: async user => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 12);
                }
            },
            // Hashear contraseñas solo cuando se actualiza la contraseña
            beforeUpdate: async user => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 12);
                }
            },
        },
    }
);

// Método para verificar contraseña
Usuario.prototype.checkPassword = async function (password) {
    // Si la contraseña almacenada tiene menos de 60 caracteres, está en texto plano
    if (this.password.length < 60) {
        return password === this.password;
    }
    // Si tiene 60+ caracteres, está hasheada con bcrypt
    return await bcrypt.compare(password, this.password);
};

// Método para obtener nombre completo
Usuario.prototype.getFullName = function () {
    return `${this.nombre} ${this.apellido}`;
};

module.exports = Usuario;
