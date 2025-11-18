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
      Reviews.belongsTo(models.Questionnaire, { foreignKey: 'questionId' });
    }
  }
  Reviews.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a UUID v4 by default
        primaryKey: true,
        allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reviewerId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    reviewerName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    revieweeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    revieweeName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};