import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getAllList = async (pageNum) => {
  return axios.get(`${http}/tourlist/all`, { params: { pageNum: pageNum } });
};
//현재진행중 ......., 지난.......,

export const getExpectedList = async (pageNum) => {
  return axios.get(`${http}/tourlist/expected`, { params: { pageNum: pageNum } });
};

export const getCompletedList = async (pageNum) => {
  return axios.get(`${http}/tourlist/completed`, { params: { pageNum: pageNum } });
};
