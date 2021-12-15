import { OPEN_TOUR_MODAL, DELETE_CLICK } from './type';

export const openTourModal = (tourInfo) => {
  return {
    type: OPEN_TOUR_MODAL,
    payload: tourInfo,
  };
};

export const clickDelete = () => {
  return {
    type: DELETE_CLICK,
  };
};
