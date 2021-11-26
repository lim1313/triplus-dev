'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guide_user_participate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  guide_user_participate.init({
    guide_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'guide_user_participate',
    freezeTableName: true
  });
  return guide_user_participate;
};