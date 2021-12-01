'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_verify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_verify.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      verify_key: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user_verify',
      freezeTableName: true,
    }
  );
  return user_verify;
};
