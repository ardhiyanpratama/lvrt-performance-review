'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.renameColumn('Softcompetencies', 'competencies', 'name');

    const tableDefinition = await queryInterface.describeTable('Softcompetencies');
    
    if (!tableDefinition['titleId']) {
      await queryInterface.addColumn('Softcompetencies', 'titleId', {
        type: Sequelize.UUID,// Generates a UUID v4 by default
        allowNull: true,
        references: {
          model: 'Titles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }

    if (!tableDefinition['departmentId']) {
      await queryInterface.addColumn('Softcompetencies', 'departmentId', {
        type: Sequelize.UUID,// Generates a UUID v4 by default
        allowNull: true,
        references: {
          model: 'Departments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Softcompetencies', 'name', 'competencies');
  }
};
