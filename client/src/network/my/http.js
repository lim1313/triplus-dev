import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//TODO POST 프로필 변경
// 기본의 프로필 url은 삭제하고 새로운 url로 갱신
export const postProfile = (data) => {
  return axios
    .post(`${http}/my/profile`, { data })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//TODO DELETE 프로필 삭제
// 기본의 프로필 url 삭제
export const deleteProfile = () => {
  return axios
    .delete(`${http}/my/profile`)
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//TODO GET 유저 정보 가져오기
export const getUserInfo = () => {
  return axios.get(`${http}/my`).then((res) => res.data);
};

//TODO POST 정보 변경
export const postInfo = (data, path) => {
  if (path === 'nickname') path = 'nick-name';
  return axios
    .post(`${http}/my/${path}`, { data })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//TODO POST 이메일 인증 발송
export const postEmailCheck = (data) => {
  return axios
    .post(`${http}/my/email-check`, { data })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

// //TODO POST 이메일 인증 해제
// export const postEmailUnCheck = () => {
//   return axios
//     .post(`${http}/my/email-unCheck`)
//     .then((res) => res.status)
//     .catch((err) => err.response.status);
// };

//TODO PUT 비밀번호 변경
export const putPassword = (data) => {
  return axios
    .put(`${http}/my/password`, { data })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//TODO DELETE 탈퇴
export const deleteUser = (data) => {
  return axios
    .post(`${http}/my/withdraw`, { data })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};
