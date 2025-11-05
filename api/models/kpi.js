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
      KPI.hasMany(models.Title, { foreignKey: 'titleId' });
      KPI.hasMany(models.Softcompetencies, { foreignKey: 'softcompetenciesId' });
      KPI.hasMany(models.Hardcompetencies, { foreignKey: 'hardcompetenciesId' });
    }
  }
  KPI.init({
    name: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'KPI',
  });
  return KPI;
};