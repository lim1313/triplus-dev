import { LOCATION_GUIDE_CARD } from './type';
import { GUIDE_MODAL } from './type';

export const guideCardInfo = (data) => {
  return {
    type: LOCATION_GUIDE_CARD,
    payload: data,
  };
};

export const openGuideModal = (data) => {
  return {
    type: GUIDE_MODAL,
    payload: data,
  };
};
