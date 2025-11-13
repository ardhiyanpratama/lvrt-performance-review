'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Hardcompetencies', 'competencies', 'name');

    const tableDefinition = await queryInterface.describeTable('Hardcompetencies');
    
    if (!tableDefinition['titleId']) {
      await queryInterface.addColumn('Hardcompetencies', 'titleId', {
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
      await queryInterface.addColumn('Hardcompetencies', 'departmentId', {
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
    await queryInterface.renameColumn('Hardcompetencies', 'name', 'competencies');
  }
};
