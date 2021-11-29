import { SCROLL_LISTENER } from './type';

export const scrollListener = (currentY) => {
  return {
    type: SCROLL_LISTENER,
    payload: {
      scrollY: currentY,
    },
  };
};
