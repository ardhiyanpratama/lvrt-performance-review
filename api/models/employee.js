'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.Title, { foreignKey: 'titleId' });
      Employee.belongsTo(models.Level, { foreignKey: 'levelId' });
      Employee.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Employee.belongsTo(models.Grade, { foreignKey: 'gradeId' });
    }
  }
  Employee.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
      primaryKey: true,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    yearsOfService: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employmentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};