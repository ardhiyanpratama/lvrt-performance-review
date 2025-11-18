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
      'SELECT COUNT(*) AS count FROM titles;'
    );

    const count = rows[0]?.count || rows.count || 0;

    if (count > 0) {
      return;
    }

    await queryInterface.bulkInsert('Titles', [
      {
        id: uuidv4(),
        name: 'Chief Executive Officer',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Chief Growth Officer',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Group Strategy Planning Director',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Group Business Consulting Director',
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Head of Performance Marketing',
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
  }
};
