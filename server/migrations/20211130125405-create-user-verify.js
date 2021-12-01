'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_verify', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
      },
      verify_key: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_verify');
  },
};
