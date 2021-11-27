import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { NoBorderBtn, BorderBtn } from '../../styles/common';

const NavContainer = styled.div`
  position: fixed;
  width: 100vw;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  height: 3.8rem;
  border: none;
  box-shadow: 0 2px 1px ${({ theme }) => theme.color.lightGray};
`;

const FlexBox = styled.div`
  display: flex;
  margin-left: ${({ marginLeft }) => marginLeft || '0'};
  margin-right: ${({ marginRight }) => marginRight || '0'};
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 5rem;
`;

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <NavContainer>
      <FlexBox marginLeft='3rem'>
        <Link to='/'>
          <LogoImg src='./logoMiddle.png' alt='로고' />
        </Link>
      </FlexBox>
      <FlexBox marginRight='3rem'>
        <Link to='map'>
          <NoBorderBtn
            fontSize='1rem'
            palette={pathname === '/map' ? 'black' : 'gray'}
            marginLeft='1rem'
          >
            지도 Map
          </NoBorderBtn>
        </Link>
        <Link to='management'>
          <NoBorderBtn
            fontSize='1rem'
            palette={pathname === '/management' ? 'black' : 'gray'}
            marginLeft='1rem'
          >
            여행 관리
          </NoBorderBtn>
        </Link>
        <Link to='chat'>
          <NoBorderBtn
            fontSize='1rem'
            palette={pathname === '/chat' ? 'black' : 'gray'}
            marginLeft='1rem'
          >
            채팅
          </NoBorderBtn>
        </Link>
        <Link to='mypage'>
          <NoBorderBtn
            fontSize='1rem'
            palette={pathname === '/mypage' ? 'black' : 'gray'}
            marginLeft='1rem'
          >
            마이 페이지
          </NoBorderBtn>
        </Link>
        <Link to='login'>
          <NoBorderBtn
            fontSize='1rem'
            palette={pathname === '/login' ? 'black' : 'gray'}
            marginLeft='1rem'
          >
            로그인
          </NoBorderBtn>
        </Link>
        <Link to='signup'>
          <BorderBtn fontSize='1rem' palette='blue' marginLeft='1.2rem'>
            회원가입
          </BorderBtn>
        </Link>
      </FlexBox>
    </NavContainer>
  );
}
