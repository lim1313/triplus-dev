import { TOGGLE_OPEN, TOGGLE_CLOSE } from './type';

const initialState = {
  isToggled: false,
};

export default function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OPEN:
      return {
        ...state,
        isToggled: action.payload.isToggled,
      };
    case TOGGLE_CLOSE:
      return {
        ...state,
        isToggled: action.payload.isToggled,
      };
    default:
      return state;
  }
}
