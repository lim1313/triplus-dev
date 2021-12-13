import { OPEN_TOUR_MODAL } from './type';

export const openTourModal = (tourInfo) => {
  return {
    type: OPEN_TOUR_MODAL,
    payload: tourInfo,
  };
};
