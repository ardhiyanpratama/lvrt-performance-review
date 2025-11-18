'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
      Department.hasMany(models.Hardcompetencies, { foreignKey: 'departmentId' });
      Department.hasMany(models.Softcompetencies, { foreignKey: 'departmentId' });
    }
  }
  Department.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
      primaryKey: true,
    },
    name: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};