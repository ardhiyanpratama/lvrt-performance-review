'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Titles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      isDelete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Employees', {
      fields: ['titleId'],
      type: 'foreign key',
      name: 'FK_Employees_Titles_titleId',
      references: { table: 'Titles', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Employees', 'FK_Employees_Titles_titleId');
    await queryInterface.dropTable('Titles');
  }
};