const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const bcrypt = require('bcryptjs');

//Cambiar cuando tengamos la bbdd real
const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100],
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name',
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^[\+]?[1-9][\d]{0,15}$/,
            },
        },
        role: {
            type: DataTypes.ENUM('admin', 'empleado'),
            allowNull: false,
            defaultValue: 'empleado',
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active',
        },
        lastLogin: {
            type: DataTypes.DATE,
            field: 'last_login',
        },
        profileImage: {
            type: DataTypes.STRING,
            field: 'profile_image',
        },
    },
    {
        tableName: 'users',
        hooks: {
            beforeCreate: async user => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 12);
                }
            },
            beforeUpdate: async user => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 12);
                }
            },
        },
    }
);

// Método para verificar contraseña
User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Método para obtener nombre completo
User.prototype.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
};

module.exports = User;
