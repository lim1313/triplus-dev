import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//! 400, 500 에러, 오류 처리 필수
//* GET 범위 내의 카드 가져오기
const CancelToken = axios.CancelToken;
let cancel;

export const getGuideCards = async (params) => {
  if (cancel !== undefined) cancel('cancel');
  return axios
    .get(`${http}/map`, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
      params,
    })
    .then((res) => res.data.guideCardList)
    .catch((err) => {
      if (axios.isCancel(err)) {
        return console.log('cancel', err);
      } else {
        return err.response.status;
      }
    });
};

//* GET 범위 내의 카드 모달
export const getCardModal = async (params) => {
  return axios
    .get(`${http}/map/guide-card`, { params: { guideId: params } })
    .then((res) => res.data.guideCard)
    .catch((err) => err.response.status);
};

//* POST 가이드 신청하기
// - 예약완료 => 204
// - 예약 이미 마감 => 201 {state: "COMPLETED"}
// - 서버에러 => 500번대
export const rezGuide = async (guideId) => {
  return axios
    .post(`${http}/map`, { guideId })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};
