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
      'SELECT COUNT(*) AS count FROM Levels;'
    );

    const count = rows[0]?.count || rows.count || 0;

    if (count > 0) {
      return;
    }

    await queryInterface.bulkInsert('Levels', [
      {
        id: uuidv4(),
        name: '1B',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: '1A',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: '3A',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: '2',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: '4',
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
    await queryInterface.bulkDelete('Levels', null, {});
  }
};
