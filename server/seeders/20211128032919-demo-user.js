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
    return queryInterface.bulkInsert('user', [
      {
        user_id: 'william9563',
        password: '123412',
        email: 'example@example.com',
        nick_name: 'mola',
        gender: '1',
        region: '서울',
        image: '',
        social: '',
        state: '',
        role: '',
        expired_datetime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'cindy12',
        password: '123412',
        email: 'example1@example.com',
        nick_name: 'cindy12',
        gender: '1',
        region: '서울',
        image: '',
        social: '',
        state: '',
        role: 'admin',
        expired_datetime: new Date(),
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

    return queryInterface.bulkDelete('user', null, {});
  },
};
