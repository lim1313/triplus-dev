import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { NoBorderBtn, BorderBtn } from '../../styles/common';

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 99;
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
  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-left: 1rem;
    &:hover {
      /* box-shadow: 0 1px 1px ${({ theme }) => theme.color.blue}; */
      border-bottom: 1px solid ${({ theme }) => theme.color.lightBlue};
    }
  }
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
          <LogoImg src='./asset/logo/logo.png' alt='로고' />
        </Link>
      </FlexBox>
      <FlexBox marginRight='3rem'>
        <Link to='map'>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/map' ? 'black' : 'gray'}>
            지도 Map
          </NoBorderBtn>
        </Link>
        <Link to='management'>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/management' ? 'black' : 'gray'}>
            여행 관리
          </NoBorderBtn>
        </Link>
        <Link to='chat'>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/chat' ? 'black' : 'gray'}>
            채팅
          </NoBorderBtn>
        </Link>
        <Link to='mypage'>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/mypage' ? 'black' : 'gray'}>
            마이 페이지
          </NoBorderBtn>
        </Link>
        <Link to='login'>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/login' ? 'black' : 'gray'}>
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
