import { SCROLL_LISTENER } from './type';

export const scrollListener = (ratioY) => {
  return {
    type: SCROLL_LISTENER,
    payload: {
      scrollY: ratioY,
    },
  };
};
