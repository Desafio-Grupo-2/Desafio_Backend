//PLACEHOLDER CODE
//NO USAR

//Modelo usuario
// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//     class User extends Model {
//         static associate(models) {
//             User.hasMany(models.Route, {
//                 foreignKey: 'UserId',
//                 as: 'routes',
//             });
//             User.hasMany(models.Token, {
//                 foreignKey: 'UserId',
//                 as: 'tokens',
//             });
//             User.hasMany(models.Ticket, {
//                 foreignKey: 'UserId',
//                 as: 'tickets',
//             });
//         }
//     }

//     User.init(
//         {
//             username: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//                 validate: {
//                     notNull: { message: 'Por favor introduce tu nombre' },
//                 },
//             },
//             email: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//                 validate: {
//                     notNull: { message: 'Por favor introduce tu email' },
//                     isEmail: { message: 'Por favor introduce un email válido' },
//                 },
//             },
//             password: DataTypes.STRING,
//             role: DataTypes.STRING,
//         },
//         {
//             sequelize,
//             modelName: 'User',
//         }
//     );

//     return User;
// };
