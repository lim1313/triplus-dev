import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//! 400, 500 에러, 오류 처리 필수
//TODO 범위 내의 카드 가져오기
export const getGuideCards = async (params) => {
  const res = await axios.get(`${http}/map`, { params });
  return res.data.guideCardList;
};

export const getCardModal = async (params) => {
  const res = await axios.get(`${http}/map/guide-card`, { params: { 'guide-id': params } });
  return res.data.guideCardList;
};
