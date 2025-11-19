'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const [rows] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM Grades;'
    );

    const count = rows[0]?.count || rows.count || 0;

    if (count > 0) {
      return;
    }

    await queryInterface.bulkInsert('Grades', [
      {
        id: uuidv4(),
        name: 'Chief',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Brand Management',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Senior Profesional',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Division Head',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Department Lead',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Senior Group Head',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Grades', null, {});
  }
};
