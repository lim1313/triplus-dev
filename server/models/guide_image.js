'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guide_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  guide_image.init({
    guide_id: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'guide_image',
  });
  return guide_image;
};