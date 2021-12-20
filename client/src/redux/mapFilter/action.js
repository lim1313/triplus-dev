import { GUIDE_CARD_FILTER, GUIDE_LATLNG_FILTER } from './type';

export const sideFilter = (data) => {
  return {
    type: GUIDE_CARD_FILTER,
    payload: data,
  };
};

export const latLngFilter = (data) => {
  return {
    type: GUIDE_LATLNG_FILTER,
    payload: data,
  };
};
