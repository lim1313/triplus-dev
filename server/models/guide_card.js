'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guide_card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      guide_card.hasOne(
        models.user,
        {
          sourceKey: 'userId',
          foreignKey: 'userId',
        }
      );
      guide_card.hasMany(
        models.guide_image,
        {
          sourceKey: 'guideId',
          foreignKey: 'guideId',
        }
      );
    }
  };
  guide_card.init({
    guideId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'guide_id',
    },
    title: {
      type: DataTypes.STRING,
    },
    content: DataTypes.STRING,
    guideDate: {
      type: DataTypes.DATE,
      field: 'guide_date',
    },
    startTime: {
      type: DataTypes.STRING,
      field: 'start_time',
    },
    endTime: {
      type: DataTypes.STRING,
      field: 'end_time'
    },
    numPeople: {
      type: DataTypes.INTEGER,
      field: 'num_people'
    },
    state: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    openDate: {
      type: DataTypes.STRING,
      field: 'open_date',
    },
    userId: {
      type: DataTypes.STRING,
      field: 'user_id',
    }
  }, {
    sequelize,
    modelName: 'guide_card',
    freezeTableName: true
  });
  return guide_card;
};