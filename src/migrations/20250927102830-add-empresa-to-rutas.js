'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('rutas', 'id_empresa', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'empresa',
        key: 'id_empresa'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('rutas', 'id_empresa');
  }
};
