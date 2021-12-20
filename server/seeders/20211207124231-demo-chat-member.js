'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('chat_member', [
      {
        room_id: 1,
        user_id: 'jechan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 1,
        user_id: 'jortier',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 2,
        user_id: 'jechan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 2,
        user_id: 'songcode',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 3,
        user_id: 'jechan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 3,
        user_id: 'lim1313',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('chat_member', null, {});
  },
};
