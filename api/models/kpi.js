'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KPI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KPI.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
      primaryKey: true,
    },
    name: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'KPI',
  });
  return KPI;
};