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
    const constraints = await queryInterface.showConstraint('KPIs');

    // Step 2: Find the foreign key constraint that includes the column
    const fkConstraintTitle = constraints.find(
      (c) =>
        c.constraintType === 'FOREIGN KEY' &&
        (
          (Array.isArray(c.columnNames) && c.columnNames.includes('titleId')) ||
          c.columnName === 'titleId' // fallback for older Sequelize versions
        )
    );
    const fkConstraintSoft = constraints.find(
      (c) =>
        c.constraintType === 'FOREIGN KEY' &&
        (
          (Array.isArray(c.columnNames) && c.columnNames.includes('softcompetenciesId')) ||
          c.columnName === 'softcompetenciesId' // fallback for older Sequelize versions
        )
    );
    const fkConstraintHard = constraints.find(
      (c) =>
        c.constraintType === 'FOREIGN KEY' &&
        (
          (Array.isArray(c.columnNames) && c.columnNames.includes('hardcompetenciesId')) ||
          c.columnName === 'hardcompetenciesId' // fallback for older Sequelize versions
        )
    );

    // Step 3: Remove the foreign key constraint if found
    if (fkConstraintTitle) {
      await queryInterface.removeConstraint('KPIs', fkConstraintTitle.constraintName);
      console.log(`Removed constraint: ${fkConstraintTitle.constraintName}`);
    } else {
      console.warn(`⚠️ No foreign key constraint found on KPIs.${'titleId'}`);
    }

    if (fkConstraintSoft) {
      await queryInterface.removeConstraint('KPIs', fkConstraintSoft.constraintName);
      console.log(`Removed constraint: ${fkConstraintSoft.constraintName}`);
    } else {
      console.warn(`⚠️ No foreign key constraint found on KPIs.${'softcompetenciesId'}`);
    }

    if (fkConstraintHard) {
      await queryInterface.removeConstraint('KPIs', fkConstraintHard.constraintName);
      console.log(`Removed constraint: ${fkConstraintHard.constraintName}`);
    } else {
      console.warn(`⚠️ No foreign key constraint found on KPIs.${'hardcompetenciesId'}`);
    }

    // Step 4: Remove the column
    await queryInterface.removeColumn('KPIs', 'titleId');
    await queryInterface.removeColumn('KPIs', 'softcompetenciesId');
    await queryInterface.removeColumn('KPIs', 'hardcompetenciesId');
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
