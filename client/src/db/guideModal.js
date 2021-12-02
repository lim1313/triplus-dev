export const db = [
  {
    title: '지하벙커 체험',
    gender: '1',
    latitude: 37.495218625,
    longitude: 126.955101761,
    tourImage: '/asset/main/trip5.png',
    userImage: '/asset/main/trip5.png',
    guideDate: '2021.03.05',
    guideId: 2,
    state: 'APPROVED', // => (예약 진행중)
    openDate: '20200203에 오픈합니다',
    content: '지하벙커 체험을 해보세요',
    startTime: '14:00',
    endTime: '16:00',
    numPeople: 4,
    address: '대전 중구 00동 00아파트',
    userParticipate: 0,
  },
  {
    title: '지하벙커 체험2',
    gender: '0',
    latitude: 37.495218625,
    longitude: 126.955101761,
    tourImage: '/asset/main/trip5.png',
    userImage: '/asset/main/trip5.png',
    guideDate: '2021.03.05',
    guideId: 2,
    state: 'APPROVED', // => (예약 진행중)
    openDate: '20200203에 오픈합니다',
    content: '지하벙커 체험을 해보세요',
    startTime: '14:00',
    endTime: '16:00',
    numPeople: 4,
    address: '대전 중구 00동 00아파트',
    userParticipate: 0,
  },
  {
    title: '지하벙커 체험3',
    gender: '0',
    latitude: 37.495218625,
    longitude: 126.955101761,
    tourImage: '/asset/main/trip5.png',
    userImage: '/asset/main/trip5.png',
    guideDate: '2021.12.05',
    guideId: 2,
    state: 'APPROVED', // => (예약 진행중)
    openDate: '20200203에 오픈합니다',
    content: '지하벙커 체험을 해보세요',
    startTime: '14:00',
    endTime: '16:00',
    numPeople: 4,
    address: '서울',
    userParticipate: 1,
  },
];

export const dbModal = {
  title: '지하벙커 체험3',
  gender: 1,
  latitude: 37.495218625,
  longitude: 126.955101761,
  tourImage: ['/asset/logo/logo.png', '/asset/main/trip5.png', '/asset/main/trip5.png'],
  userImage: '/asset/main/stamp.png',
  guideDate: '2021.12.05',
  guideId: 2,
  state: 'APPROVED', // => (예약 진행중)
  openDate: '20200203에 오픈합니다',
  content:
    '지하벙커 체험을 해보세요지하벙커 체험을 해보세요지하벙커 체험을 해보세요지하벙커 체험을 해보세요지하벙커 체험을 해보세요지하벙커 체험을 해보세요지하벙커 체험을 해보세요지하벙커 체험을 해보세요지하벙커 체험을 해보세요',
  startTime: '14:00',
  endTime: '16:00',
  numPeople: 4,
  address: '서울',
  userParticipate: 0,
};
// REQUESTED,
// APPROVED,
// REJECTED,
// COMPLETED,
// CANCELED,
