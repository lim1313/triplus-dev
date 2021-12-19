/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import MyPageComponent from '../components/mypage/MyPage';
import { exit } from '../redux/login/action';

export default function MyPage() {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.logout) {
      dispatch(exit());
    }
  }, [state]);

  return (
    <>
      {isLogin ? (
        <MyPageComponent />
      ) : (
        <Navigate
          to='/login'
          replace
          state={state?.logout && '비밀번호가 변경되어, 로그아웃되었습니다.'}
        />
      )}
    </>
  );
}
