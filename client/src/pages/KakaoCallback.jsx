import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Loading from '../components/common/Loading';
import { kakaoOauth } from '../network/login/http';
import { oauthLogin } from '../redux/login/action';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');
  const dispatch = useDispatch();

  useEffect(() => {
    kakaoOauth(authorizationCode).then((res) => {
      if (res >= 400) {
        alert('로그인에 실패했습니다');
        navigate('/login', { replace: true });
      } else {
        dispatch(oauthLogin());
        navigate(-1);
      }
    });
  }, [authorizationCode, navigate, dispatch]);

  return <Loading />;
}
