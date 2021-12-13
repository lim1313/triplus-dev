import { OPEN_TOUR_MODAL } from './type';

//{isOpen: true, guideInfo: {}}
export const openTourModalReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_TOUR_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
