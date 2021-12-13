import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MyPageComponent from '../components/mypage/MyPage';

export default function MyPage() {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);

  return <>{isLogin ? <MyPageComponent /> : <Navigate to='/login' replace />}</>;
}
