import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//* GET 유저 정보 가져오기
export const getUserInfo = () => {
  return axios
    .get(`${http}/my`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.status;
    });
};

//* POST 프로필 변경
// 새로운 url로 갱신
export const postProfile = (data) => {
  return axios
    .post(`${http}/my/profile`, { image: data })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//* DELETE 프로필 삭제
// 기본의 프로필 url 삭제
export const deleteProfile = () => {
  return axios
    .delete(`${http}/my/profile`, { data: { image: null } })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//* POST 정보 변경
export const postInfo = (data, path) => {
  let param = {};
  if (path === 'nickname') {
    path = 'nick-name';
    param['nickName'] = data;
  } else if (path === 'address') {
    path = 'region';
    param['region'] = data;
  } else if (path === 'email') {
    path = 'email';
    param = data;
  }
  return axios
    .post(`${http}/my/${path}`, param)
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//* POST 이메일 인증 발송
export const postEmailCheck = (data) => {
  return axios
    .post(`${http}/my/email-check`, { data })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//* PUT 비밀번호 변경
export const putPassword = (data) => {
  return axios
    .put(`${http}/my/password`, data)
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

//* DELETE 탈퇴
//! ouath인 경우 그냥 탈퇴 진행
export const deleteUser = (inputValue, social) => {
  return axios
    .post(`${http}/my/withdraw`, { password: inputValue, social })
    .then((res) => res.status)
    .catch((err) => err.response.status);
};
