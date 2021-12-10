import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getGuideInfo = async () => {
  return axios.get(`${http}/management/guide`);
};

export const createGudie = async (data) => {
  console.log(data);
  return axios.post(`${http}/management/guide-card`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteGuideCard = async (guideId) => {
  return axios.put(`${http}/management/guide`, { guideId });
};

export const editGuideCard = async (data) => {
  return axios.put(`${http}/management/guide-card`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
