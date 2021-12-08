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
    return queryInterface.bulkInsert('chat_room', [
      {
        room_id: 1,
        message:
          '{"date":"2021.12.07 13:22:33:455","user_id":"Je-chan","content":"시험한 번 해보자"}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 2,
        message:
          '{"date":"2021.12.08 14:22:33:455","user_id":"Je-chan","content":"두 번째 시험이다"}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 3,
        message:
          '{"date":"2021.12.06 11:22:36:455","user_id":"lim1313","content":"세 번째 시험이다"}',
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
    return queryInterface.bulkDelete('chat_room', null, {});
  },
};
