import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//ASC 빠른순, DESC 느린순
export const getAllList = async (pageNum) => {
  return axios.get(`${http}/tourlist/all`, { params: { pageNum: pageNum, sortBy: 'ASC' } });
};
//현재진행중 ......., 지난.......,

export const getExpectedList = async (pageNum, sortBy) => {
  return axios.get(`${http}/management/tourlist/expected`, {
    params: { page: pageNum.approved, sortBy },
  });
};

export const getCompletedList = async (pageNum, sortBy) => {
  return axios.get(`${http}/management/tourlist/completed`, {
    params: { page: pageNum.completed, sortBy },
  });
};
