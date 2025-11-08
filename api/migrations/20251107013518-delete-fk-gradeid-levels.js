'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // Step 1: Get all constraints for the table
    const constraints = await queryInterface.showConstraint('Levels');

    // Step 2: Find the foreign key constraint that includes the column
    const fkConstraint = constraints.find(
      (c) =>
        c.constraintType === 'FOREIGN KEY' &&
        (
          (Array.isArray(c.columnNames) && c.columnNames.includes('gradeId')) ||
          c.columnName === 'gradeId' // fallback for older Sequelize versions
        )
    );

    // Step 3: Remove the foreign key constraint if found
    if (fkConstraint) {
      await queryInterface.removeConstraint('Levels', fkConstraint.constraintName);
      console.log(`Removed constraint: ${fkConstraint.constraintName}`);
    } else {
      console.warn(`⚠️ No foreign key constraint found on Levels.${'gradeId'}`);
    }

    // Step 4: Remove the column
    await queryInterface.removeColumn('Levels', 'gradeId');
    console.log(`Removed column: gradeId from Levels table`);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
