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
    return queryInterface.bulkInsert('user_verify', [
      {
        user_id: 'jechan',
        email_verified: 1,
        verify_key: 'gogogo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'jortier',
        email_verified: 1,
        verify_key: 'gogogo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'songcode',
        email_verified: 1,
        verify_key: 'gogogo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'lim1313',
        email_verified: 1,
        verify_key: 'gogogo',
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
    return queryInterface.bulkDelete('user_verify', null, {});
  },
};
