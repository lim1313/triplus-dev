import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getGuide = async (page, size = 5) => {
  return axios.get(`${http}/admin`, { params: { page: page, size: size } });
};

export const cancelGuide = (guideId) => {
  return axios.put(`${http}/admin/cancellation`, { guideId });
};
