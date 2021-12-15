import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const CancelToken = axios.CancelToken;
let cancel;

//* GET 범위 내의 모든 가이드 카드
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
        console.log(err);
      } else {
        return err.response.status;
      }
    });
};

//* GET 범위 내의 카드 모달
export const getCardModal = async (params) => {
  return axios
    .get(`${http}/map/guide-card`, { params: { guideId: params } })
    .then((res) => {
      return res.data.guideCard;
    })
    .catch((err) => err.response.status);
};

//* POST 가이드 신청하기
// - 204 => 예약완료
// - 201 => 중복 신청, 이미 마감
// - 서버에러 => 500번대
//! 신청하기 클릭 시 status code 추가 필요
export const rezGuide = async (guideId) => {
  return axios
    .post(`${http}/map`, { guideId })
    .then((res) => res)
    .catch((err) => err.response);
};
