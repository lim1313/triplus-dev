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
    
    return queryInterface.bulkInsert('guide_card', [
      {
        guide_id: 1,
        title: '우아한 형제들 사무실 투어',
        content: '우리는 항상 배달의 민족을 쓴다.',
        guide_date: new Date('2021-12-20'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '서울특별시 송파구 방이2동 위례성대로 2',
        latitude: 37.5168692,
        longitude: 127.1106057,
        open_date: '',
        user_id: 'william9563',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        guide_id: 2,
        title: '코드스테이츠 사무실 투어',
        content: '코드스테이츠, 그 곳은 어떤 곳인가?',
        guide_date: new Date('2021-12-21'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '서울특별시 서초구 서초동 서초대로 396',
        latitude: 37.4965304,
        longitude: 127.0225693,
        open_date: '',
        user_id: 'william9563',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        guide_id: 3,
        title: '경복궁 한복 체험',
        content: '경복궁에서 한복 입고, 놀아봐!',
        guide_date: new Date('2021-12-22'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '서울특별시 종로구 세종로 사직로 161',
        latitude: 37.579617,
        longitude: 126.9748523,
        open_date: '',
        user_id: 'william9563',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        guide_id: 4,
        title: '칵테일과 마술쇼를 한자리에',
        content: '뭐? 칵테일을 마시면서 마술쇼를 볼 수 있다고?',
        guide_date: new Date('2021-12-23'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '서울 강남구 도산대로12길 6 지하 1층',
        latitude: 37.5170609,
        longitude: 127.0212705,
        open_date: '',
        user_id: 'william9563',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        guide_id: 5,
        title: '네이버 본사 둘러보기',
        content: '초록 검색창의 본사는 어떤 곳일까?',
        guide_date: new Date('2021-12-24'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '경기 성남시 분당구 불정로 6',
        latitude: 37.3591784,
        longitude: 127.0873224,
        open_date: '',
        user_id: 'william9563',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        guide_id: 6,
        title: '카카오 제주 본사 둘러보기',
        content: '카카오 본사에 가보자!',
        guide_date: new Date('2021-12-25'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '제주특별자치도 제주시 첨단로 242',
        latitude: 33.4507049,
        longitude: 126.5684495,
        open_date: '',
        user_id: 'william9563',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        guide_id: 7,
        title: '부산 최고의 야외 술집, 수변공원',
        content: '이 곳은 술집인가, 공원인가',
        guide_date: new Date('2021-12-26'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '부산 수영구 광안해변로 361',
        latitude: 35.1545055,
        longitude: 129.1310135,
        open_date: '',
        user_id: 'william9563',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        guide_id: 8,
        title: '성심당에서 나만의 케이크 만들기',
        content: '2019년에 한 번 했다고 해서 가져와 봤습니다.',
        guide_date: new Date('2021-12-27'),
        start_time: '10:00',
        end_time: '15:00',
        num_people: 10,
        state: 'APPROVED',
        address: '대전 중구 대종로480번길 15',
        latitude: 36.3276642,
        longitude: 127.4251021,
        open_date: '',
        user_id: 'william9563',
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

    return queryInterface.bulkDelete('guide_card', null, {});
  }
};
