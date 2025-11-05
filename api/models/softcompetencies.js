'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Softcompetencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Softcompetencies.belongsTo(models.KPI, { foreignKey: 'softcompetenciesId' });
    }
  }
  Softcompetencies.init({
    competencies: DataTypes.TEXT,
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
    modelName: 'Softcompetencies',
  });
  return Softcompetencies;
};