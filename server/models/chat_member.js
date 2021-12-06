'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chat_member.hasOne(
        models.chat_room, {
          sourceKey: 'roomId',
          foreignKey: 'roomId'
        }
      );
      chat_member.hasOne(
        models.user,
        {
          sourceKey: 'userId',
          foreignKey: 'userId',
        }
      );
    }
  };
  chat_member.init({
    roomId: {
      type: DataTypes.INTEGER,
      field: 'room_id'
    },
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chat_member',
    freezeTableName: true
  });
  return chat_member;
};