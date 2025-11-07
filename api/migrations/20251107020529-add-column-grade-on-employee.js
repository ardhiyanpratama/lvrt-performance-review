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

    //check if column already exists
    const tableDefinition = await queryInterface.describeTable('Employees');
    
    if (!tableDefinition['gradeId']) {
      await queryInterface.addColumn('Employees', 'gradeId', {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4, 
        allowNull: true,
      });
    }
    else {
      console.log('Column gradeId already exists in Employees table. Skipping addColumn.');
    }

    //check if foreign key constraint already exists
    const constraints = await queryInterface.showConstraint('Employees');

    // Step 2: Find the foreign key constraint that includes the column
    const fkConstraint = constraints.find(
      (c) =>
        c.constraintType === 'FOREIGN KEY' &&
        (
          (Array.isArray(c.columnNames) && c.columnNames.includes('gradeId')) ||
          c.columnName === 'gradeId' // fallback for older Sequelize versions
        )
    );

    if (!fkConstraint) {
      await queryInterface.addConstraint('Employees', {
        fields: ['gradeId'],
        type: 'foreign key',
        name: 'employees_gradeId_fkey', // custom constraint name
        references: {
          table: {
            tableName: 'Grades',
            schema: 'dbo'
          },
          field: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    } else {
      console.log(`Foreign key constraint on Employees.gradeId already exists as ${fkConstraint.constraintName}. Skipping addConstraint.`);
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    //remove foreign key constraint
    const constraints = await queryInterface.showConstraint('Employees');
    const fkConstraint = constraints.find(
      (c) =>
        c.constraintType === 'FOREIGN KEY' &&
        (
          (Array.isArray(c.columnNames) && c.columnNames.includes('gradeId')) ||
          c.columnName === 'gradeId' // fallback for older Sequelize versions
        )
    );

    if (fkConstraint && fkConstraint.constraintName) {
      await queryInterface.removeConstraint(tableName, fkConstraint.constraintName);
      console.log(`✅ Removed FK constraint: ${fkConstraint.constraintName}`);
    } else {
      console.warn(`⚠️ No FK constraint found for gradeId on Employees table`);
    }

    //remove column
    const tableDefinition = await queryInterface.describeTable('Employees');
    if (tableDefinition['gradeId']) {
      await queryInterface.removeColumn('Employees', 'gradeId');
      console.log(`✅ Removed column: gradeId from Employees table`);
    } else {
      console.warn(`⚠️ Column gradeId does not exist, skipping removeColumn`);
    }

  }
};
