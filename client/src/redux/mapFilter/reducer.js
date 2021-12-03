import { GUIDE_CARD_FILTER, GUIDE_LATLNG_FILTER } from './type';

const initialState = {};

// 불변성 체크 => immer 고려

export const cardFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GUIDE_CARD_FILTER:
      return { ...state, ...action.payload };
    case GUIDE_LATLNG_FILTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
