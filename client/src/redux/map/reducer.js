import { LOCATION_GUIDE_CARD } from './type';
import { GUIDE_MODAL } from './type';

export const guideCardsReducer = (state = [], action) => {
  switch (action.type) {
    case LOCATION_GUIDE_CARD:
      return [...action.payload];
    default:
      return state;
  }
};

// {isOpen : true, modalInfo :{}}
export const guideModalReducer = (state = [], action) => {
  switch (action.type) {
    case GUIDE_MODAL:
      return { ...action.payload };
    default:
      return state;
  }
};
