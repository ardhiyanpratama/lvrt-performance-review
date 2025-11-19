// scripts/dbSyncAndSeed.js
const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('../models');

function createMigrationUmzug() {
  return new Umzug({
    migrations: {
      glob: path.join(__dirname, '../migrations/*.js'),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
      modelName: 'SequelizeMeta', // default table for migrations
    }),
    logger: console,
  });
}

function createSeederUmzug() {
  return new Umzug({
    migrations: {
      glob: path.join(__dirname, '../seeders/*.js'),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
      modelName: 'SequelizeData', // table for seeders runs, name is up to you
    }),
    logger: console,
  });
}

async function runMigrations() {
  const migrator = createMigrationUmzug();
  await migrator.up();
}

async function runSeeders() {
    const seeder = createSeederUmzug();
    
    console.log('>>> PENDING SEEDERS:');
    const pending = await seeder.pending();
    console.log(pending.map(p => p.name));
    await seeder.up();
}

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    console.log('Running migrations...');
      // await runMigrations();
    await sequelize.sync({ alter: true }); // Use sync with alter to update tables
    console.log('Migrations finished.');

    console.log('Running seeders...');
    // await runSeeders();
    console.log('Seeders finished.');
  } catch (err) {
    console.error('Database init error:', err);
    throw err;
  }
}

module.exports = {
  initDatabase,
};
