import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//! 400, 500 에러, 오류 처리 필수
//TODO GET 범위 내의 카드 가져오기
export const getGuideCards = async (params) => {
  const res = await axios.get(`${http}/map`, { params });
  return res.data.guideCardList;
};

//TODO GET 범위 내의 카드 모달
export const getCardModal = async (params) => {
  const res = await axios.get(`${http}/map/guide-card`, { params: { 'guide-id': params } });
  return res.data.guideCardList;
};

// TODO POST 가이드 신청하기
export const rezGuide = async (guideId) => {
  const res = await axios.post(`${http}/map`, { guideId });
  return res;
};
