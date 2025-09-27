const { Usuario, Empresa } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Buscar la empresa creada
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            if (!empresa) {
                throw new Error('Empresa no encontrada. Ejecuta primero el seeder de empresa.');
            }

            // Crear jefe de flota (administrador)
            const jefeFlota = await Usuario.create({
                username: 'luismi.kuna',
                password: 'Admin123!',
                email: 'luismi.kuna@sanmillanbus.com',
                nombre: 'Luismi',
                apellido: 'Kuna',
                role: 'administrador',
                active: true,
                id_empresa: empresa.id_empresa
            });

            // Crear conductores
            const conductores = [
                {
                    username: 'arantza.bridge',
                    password: 'Conductor123!',
                    email: 'arantza.bridge@sanmillanbus.com',
                    nombre: 'Arantza',
                    apellido: 'Bridge',
                    role: 'conductor',
                    active: true,
                    id_empresa: empresa.id_empresa
                },
                {
                    username: 'marjorie.bridge',
                    password: 'Conductor123!',
                    email: 'marjorie.bridge@sanmillanbus.com',
                    nombre: 'Marjorie',
                    apellido: 'Bridge',
                    role: 'conductor',
                    active: true,
                    id_empresa: empresa.id_empresa
                },
                {
                    username: 'jorge.bridge',
                    password: 'Conductor123!',
                    email: 'jorge.bridge@sanmillanbus.com',
                    nombre: 'Jorge',
                    apellido: 'Bridge',
                    role: 'conductor',
                    active: true,
                    id_empresa: empresa.id_empresa
                },
                {
                    username: 'david.bridge',
                    password: 'Conductor123!',
                    email: 'david.bridge@sanmillanbus.com',
                    nombre: 'David',
                    apellido: 'Bridge',
                    role: 'conductor',
                    active: true,
                    id_empresa: empresa.id_empresa
                },
                {
                    username: 'iraitz.bridge',
                    password: 'Conductor123!',
                    email: 'iraitz.bridge@sanmillanbus.com',
                    nombre: 'Iraitz',
                    apellido: 'Bridge',
                    role: 'conductor',
                    active: true,
                    id_empresa: empresa.id_empresa
                }
            ];

            const usuariosCreados = await Usuario.bulkCreate(conductores);

            console.log('Jefe de flota creado:', jefeFlota.username);
            console.log('Conductores creados:', usuariosCreados.length);
            
            return { jefeFlota, conductores: usuariosCreados };
        } catch (error) {
            console.error('Error creando usuarios:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            if (empresa) {
                await Usuario.destroy({
                    where: { id_empresa: empresa.id_empresa }
                });
            }
            console.log('Usuarios eliminados');
        } catch (error) {
            console.error('Error eliminando usuarios:', error);
            throw error;
        }
    }
};
