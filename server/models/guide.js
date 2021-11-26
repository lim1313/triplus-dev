'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Guide.init({
    guide_id: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    guide_date: DataTypes.DATE,
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    num_people: DataTypes.NUMBER,
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    open_date: DataTypes.DATE,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Guide',
  });
  return Guide;
};