'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Employee = require('./employee')(sequelize, Sequelize.DataTypes);
db.Department = require('./department')(sequelize, Sequelize.DataTypes);
db.Level = require('./level')(sequelize, Sequelize.DataTypes);
db.Title = require('./title')(sequelize, Sequelize.DataTypes);

//Associations
db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId' });
db.Department.hasMany(db.Employee, { foreignKey: 'departmentId' });
db.Employee.belongsTo(db.Level, { foreignKey: 'levelId' });
db.Level.hasMany(db.Employee, { foreignKey: 'levelId' });
db.Employee.belongsTo(db.Title, { foreignKey: 'titleId' });
db.Title.hasMany(db.Employee, { foreignKey: 'titleId' });

module.exports = db;
