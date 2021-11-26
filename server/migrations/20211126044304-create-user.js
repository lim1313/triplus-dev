'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      nick_name: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      o_auth: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      expired_datetime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};