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
        o_auth: '',
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
        o_auth: '',
        state: '',
        role: 'admin',
        expired_datetime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'Je-chan',
        password: 'qweqwe',
        email: 'example@example.com',
        nick_name: 'aaa',
        gender: '1',
        region: '경기',
        image: '',
        o_auth: '',
        state: '',
        role: '',
        expired_datetime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'Joriter',
        password: 'qweqwe',
        email: 'example@example.com',
        nick_name: '',
        gender: '1',
        region: '부산',
        image: '',
        o_auth: '',
        state: '',
        role: '',
        expired_datetime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'Song-code',
        password: 'qweqwe',
        email: 'example@example.com',
        nick_name: 'ccc',
        gender: '1',
        region: '경기',
        image: '',
        o_auth: '',
        state: '',
        role: '',
        expired_datetime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'lim1313',
        password: 'qweqwe',
        email: 'example@example.com',
        nick_name: 'ddd',
        gender: '1',
        region: '대전',
        image: '',
        o_auth: '',
        state: '',
        role: '',
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
