import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { NoBorderBtn } from '../../styles/common';

import { logoutUser } from '../../redux/login/action';
import { useSelector, useDispatch } from 'react-redux';
import { toggleClose } from '../../redux/toggle/action';
import { changeCurrentRoom } from '../../redux/chat/action';

const slideLeft = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateX(-50vw);
  }
`;

const Wrapper = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    position: fixed;
    right: -50vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: 2rem 1.3rem 15rem;
    width: 60%;
    height: 100%;
    /* background-color: ${({ theme }) => theme.color.gray}; */
    background-color: #fff;
    transition: all 1s;
    z-index: 998;
    box-shadow: -1px 0 5px 1px ${({ theme }) => theme.color.lightGray};
    overflow: hidden;
    ${({ isToggled }) =>
      isToggled &&
      css`
        animation: ${slideLeft} 0.5s;
        animation-fill-mode: forwards;
        transition: all 0s linear;
      `};
  }
`;

export default function Toggle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const isToggled = useSelector((state) => state.toggleReducer.isToggled);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    dispatch(toggleClose());
    navigate('/');
  };

  const toggleCloseHandler = () => {
    dispatch(changeCurrentRoom(0));
    dispatch(toggleClose());
  };

  return (
    <Wrapper isToggled={isToggled}>
      <Link to='map'>
        <NoBorderBtn fontSize='1rem' palette='gray' onClick={toggleCloseHandler}>
          지도 Map
        </NoBorderBtn>
      </Link>
      <Link to='management'>
        <NoBorderBtn fontSize='1rem' palette='gray' onClick={toggleCloseHandler}>
          여행 관리
        </NoBorderBtn>
      </Link>
      <Link to='chat'>
        <NoBorderBtn fontSize='1rem' palette='gray' onClick={toggleCloseHandler}>
          채팅
        </NoBorderBtn>
      </Link>
      {isLogin ? (
        <Link to='mypage'>
          <NoBorderBtn fontSize='1rem' palette='gray' onClick={toggleCloseHandler}>
            마이 페이지
          </NoBorderBtn>
        </Link>
      ) : (
        <Link to='login'>
          <NoBorderBtn fontSize='1rem' palette='blue' onClick={toggleCloseHandler}>
            로그인
          </NoBorderBtn>
        </Link>
      )}
      {isLogin ? (
        <NoBorderBtn fontSize='1rem' palette='blue' onClick={handleLogoutClick}>
          로그아웃
        </NoBorderBtn>
      ) : (
        <Link to='signup'>
          <NoBorderBtn fontSize='1rem' palette='blue' onClick={toggleCloseHandler}>
            회원가입
          </NoBorderBtn>
        </Link>
      )}
    </Wrapper>
  );
}
