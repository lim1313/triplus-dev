import { OPEN_TOUR_MODAL, DELETE_CLICK, COMPELTE_DELETE } from './type';

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

export const completeDelete = () => {
  return {
    type: COMPELTE_DELETE,
  };
};
