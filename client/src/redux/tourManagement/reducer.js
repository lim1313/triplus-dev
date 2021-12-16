import { OPEN_TOUR_MODAL, DELETE_CLICK, COMPELTE_DELETE } from './type';

//{isOpen: true, guideInfo: {}}
export const openTourModalReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_TOUR_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const openDeleteModalReducer = (state = false, action) => {
  switch (action.type) {
    case DELETE_CLICK:
      return !state;
    default:
      return state;
  }
};

export const completeDeleteReducer = (state = false, action) => {
  switch (action.type) {
    case COMPELTE_DELETE:
      return !state;
    default:
      return state;
  }
};
