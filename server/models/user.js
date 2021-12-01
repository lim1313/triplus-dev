'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      nick_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      region: DataTypes.STRING,
      image: DataTypes.STRING,
      o_auth: DataTypes.STRING,
      state: DataTypes.STRING,
      role: DataTypes.STRING,
      expired_datetime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
    }
  );
  return user;
};
