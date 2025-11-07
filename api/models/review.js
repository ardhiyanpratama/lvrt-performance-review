'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
    }
  }
  Reviews.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
        primaryKey: true,
        allowNull: false,
    },
    reviewerId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
        allowNull: false,
    },
    revieweeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};