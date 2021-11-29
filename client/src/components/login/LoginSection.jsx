import React, { useState } from 'react';
import styled from 'styled-components';
import LoginBtns from './LoginBtns';
import LoginId from './LoginId';
import LoginPw from './LoginPw';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/login/action';
import { useNavigate } from 'react-router-dom';

const SectionBlock = styled.div`
  max-width: 100%;
`;

export default function LoginSection(props) {
  // ---- 상태정의 ----
  const state = useSelector((state) => state.loginReducer);
  const { isLogin } = state;
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // ---- navigate ----
  if (isLogin) {
    navigate('/');
  }

  // ---- 이벤트 핸들러 ----
  const handleIdChange = (e) => {
    setUserId(e.target.value);
  };
  const handlePwChange = (e) => {
    setUserPw(e.target.value);
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    let body = {
      userId: userId,
      password: userPw,
    };
    dispatch(loginUser(body));
  };
  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <SectionBlock>
      <LoginId userId={userId} handleIdChange={handleIdChange} />
      <LoginPw userPw={userPw} handlePwChange={handlePwChange} />
      <LoginBtns handleLoginClick={handleLoginClick} handleSignupClick={handleSignupClick} />
    </SectionBlock>
  );
}
