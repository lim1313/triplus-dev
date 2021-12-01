import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleOauth } from '../network/login/http';
import { useDispatch } from 'react-redux';
import { oauthLogin } from '../redux/login/action';

export default function GoogleCallback({ loginHandler }) {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');
  const dispatch = useDispatch();

  useEffect(() => {
    googleOauth(authorizationCode).then((res) => {
      dispatch(oauthLogin());
      navigate(-1);
    });
  }, [authorizationCode, navigate, dispatch]);

  return <div>구글로그인 진행중....!!!</div>;
}
