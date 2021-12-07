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

//TODO POST 프로필 변경
// 기본의 프로필 url은 삭제하고 새로운 url로 갱신
export const postProfile = (data) => {
  return axios.post(`${http}/mypage/profile`, { data });
};

//TODO DELETE 프로필 삭제
// 기본의 프로필 url 삭제
export const deleteProfile = () => {
  return axios.delete(`${http}/mypage/profile`);
};