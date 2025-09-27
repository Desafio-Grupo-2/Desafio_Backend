'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'id_empresa', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'empresa',
        key: 'id_empresa'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'id_empresa');
  }
};
