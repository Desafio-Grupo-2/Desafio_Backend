'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear usuario administrador
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // USUARIOS - Transporte Escolar en Bizkaia
    await queryInterface.bulkInsert('users', [
      // ADMIN - IT y mantenimiento
      {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'admin@empresademo.com',
        password: hashedPassword,
        first_name: 'Iker',
        last_name: 'Mendizabal',
        phone: '+34 944 123 456',
        role: 'admin',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      // JEFE DE FLOTA - Visión empresarial
      {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'jefe.flota@empresademo.com',
        password: hashedPassword,
        first_name: 'Amaia',
        last_name: 'Etxeberria',
        phone: '+34 944 123 457',
        role: 'admin', // Jefe de flota tiene permisos de admin
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      // CONDUCTORES - Empleados
      {
        id: '00000000-0000-0000-0000-000000000003',
        email: 'jon.uranga@empresademo.com',
        password: hashedPassword,
        first_name: 'Jon',
        last_name: 'Uranga',
        phone: '+34 600 123 001',
        role: 'empleado',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '00000000-0000-0000-0000-000000000004',
        email: 'maite.ibarrola@empresademo.com',
        password: hashedPassword,
        first_name: 'Maite',
        last_name: 'Ibarrola',
        phone: '+34 600 123 002',
        role: 'empleado',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '00000000-0000-0000-0000-000000000005',
        email: 'ander.otxoa@empresademo.com',
        password: hashedPassword,
        first_name: 'Ander',
        last_name: 'Otxoa',
        phone: '+34 600 123 003',
        role: 'empleado',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '00000000-0000-0000-0000-000000000006',
        email: 'leire.agirre@empresademo.com',
        password: hashedPassword,
        first_name: 'Leire',
        last_name: 'Agirre',
        phone: '+34 600 123 004',
        role: 'empleado',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '00000000-0000-0000-0000-000000000007',
        email: 'mikel.zubia@empresademo.com',
        password: hashedPassword,
        first_name: 'Mikel',
        last_name: 'Zubia',
        phone: '+34 600 123 005',
        role: 'empleado',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '00000000-0000-0000-0000-000000000008',
        email: 'nerea.leiza@empresademo.com',
        password: hashedPassword,
        first_name: 'Nerea',
        last_name: 'Leiza',
        phone: '+34 600 123 006',
        role: 'empleado',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      // USUARIO ADMINISTRADOR PARA PRUEBAS
      {
        id: '00000000-0000-0000-0000-000000000009',
        email: 'admin@tripulaciones.com',
        password: hashedPassword,
        first_name: 'Admin',
        last_name: 'Sistema',
        phone: '+34 600 000 000',
        role: 'admin',
        is_active: true,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};