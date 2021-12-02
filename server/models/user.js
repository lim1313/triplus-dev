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
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'user_id'
      },
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      nickName: {
        type: DataTypes.STRING,
        field: 'nick_name'
      },
      gender: DataTypes.STRING,
      region: DataTypes.STRING,
      image: DataTypes.STRING,
      OAuth: {
        type: DataTypes.STRING,
        field: 'o_auth',
      },
      state: DataTypes.STRING,
      role: DataTypes.STRING,
      expiredDatetime: {
        type: DataTypes.DATE,
        field: 'expired_datetime'
      },
    },
    {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
    }
  );
  return user;
};
