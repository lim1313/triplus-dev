import { LOCATION_GUIDE_CARD } from './type';

const guideCardInfo = (data) => {
  return {
    type: LOCATION_GUIDE_CARD,
    payload: data,
  };
};

export default guideCardInfo;
