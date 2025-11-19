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
      'SELECT COUNT(*) AS count FROM departments;'
    );

    const count = rows[0]?.count || rows.count || 0;

    if (count > 0) {
      return;
    }

    await queryInterface.bulkInsert('Departments', [
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
        name: 'Management',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Finance',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Content & Outreach',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Performance Marketing',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'People & Culture',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Business Consulting',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Creative',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    console.log('>>> ROLLING BACK DEMO USER SEEDER');
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
