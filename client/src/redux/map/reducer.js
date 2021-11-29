import { LOCATION_GUIDE_CARD } from './type';

const initialState = [];

// 불변성 체크 => immer 고려

export const guideCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_GUIDE_CARD:
      return [...action.payload];
    default:
      return state;
  }
};
