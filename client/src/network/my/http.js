import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//TODO GET 유저 정보 가져오기
export const getUserInfo = (data) => {
  return axios.get(`${http}/mypage`, { data }).then((res) => res.data);
};

//TODO POST 정보 변경
export const postNickName = (data, path) => {
  if (path === 'nickname') path = 'nick-name';
  return axios.post(`${http}/mypage/${path}`, { data });
};
