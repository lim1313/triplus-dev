import { SCROLL_LISTENER } from './type';

const initialState = {
  scrollY: 0,
};

export default function scrollListener(state = initialState, action) {
  switch (action.type) {
    case SCROLL_LISTENER:
      return {
        ...state,
        scrollY: action.payload.scrollY,
      };
    default:
      return state;
  }
}
