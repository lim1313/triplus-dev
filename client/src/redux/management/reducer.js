import { CLICK_GUIDE_DELETE } from './type';

export const guideDeleteReducer = (state = false, action) => {
  switch (action.type) {
    case CLICK_GUIDE_DELETE:
      return !state;
    default:
      return state;
  }
};
