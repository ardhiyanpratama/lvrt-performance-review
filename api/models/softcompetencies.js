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
      Softcompetencies.belongsTo(models.Title, { foreignKey: 'titleId' });
      Softcompetencies.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Softcompetencies.hasMany(models.Questionnaire, { foreignKey: 'softcompetenciesId' });
    }
  }
  Softcompetencies.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
      primaryKey: true,
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    titleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: DataTypes.TEXT,
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