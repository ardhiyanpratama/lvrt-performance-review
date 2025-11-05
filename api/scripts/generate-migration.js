const path = require('path');
const migrationGenerator = require('sequelize-typescript-migration');
const db = require('../models');

(async () => {
    try {
    const createMigration = migrationGenerator.createMigration || migrationGenerator.default || migrationGenerator;
    await createMigration(db.sequelize, {
      outDir: path.resolve(__dirname, '../migrations'),
      migrationName: 'init-all-models'
    });
    console.log('✅ Migration generated successfully in /migrations');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to generate migration:', error);
    process.exit(1);
  }
})();