import { LOCATION_GUIDE_CARD } from './type';

const guideCardInfo = (data) => {
  //thunk로 비동기 처리 필요하나?
  return {
    type: LOCATION_GUIDE_CARD,
    payload: data,
  };
};

export default guideCardInfo;
