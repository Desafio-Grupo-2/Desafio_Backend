'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Cambiar el tipo de columna total_km de INTEGER a DECIMAL
    await queryInterface.changeColumn('ruta', 'total_km', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir el cambio
    await queryInterface.changeColumn('ruta', 'total_km', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
