'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Questionnaire.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
        primaryKey: true,
        allowNull: false,
    },
    titleId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
        allowNull: false,
    },
    softcompetenciesId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
      allowNull: false,
    },
    hardcompetenciesId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
      allowNull: false,
    },
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
    modelName: 'Questionnaire',
  });
  return Questionnaire;
};