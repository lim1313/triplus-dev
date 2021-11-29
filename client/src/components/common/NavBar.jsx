/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { NoBorderBtn, BorderBtn } from '../../styles/common';

const NavContainer = styled.div`
  position: sticky;
  position: -webkit-sticky;
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
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-left: 1rem;
    border-bottom: ${({ active }) => (active === 'true' ? '3px solid #000' : '3px solid #fff')};
  }
`;

const LogoImg = styled.img`
  width: 5rem;
`;

export default function NavBar() {
  const [routed, setRouted] = useState({
    map: 'false',
    management: 'false',
    chat: 'false',
    mypage: 'false',
    login: 'false',
  });

  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.slice(1);
    console.log(path);
    setRouted({
      map: 'false',
      management: 'false',
      chat: 'false',
      mypage: 'false',
      login: 'false',
      [path]: 'true',
    });
  }, [pathname]);

  return (
    <NavContainer>
      <FlexBox marginLeft='3rem'>
        <Link to='/'>
          <LogoImg src='./asset/logo/logo.png' alt='로고' />
        </Link>
      </FlexBox>
      <FlexBox marginRight='3rem'>
        <Link to='/map' active={routed.map}>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/map' ? 'black' : 'gray'}>
            지도 Map
          </NoBorderBtn>
        </Link>
        <Link to='/management' active={routed.management}>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/management' ? 'black' : 'gray'}>
            여행 관리
          </NoBorderBtn>
        </Link>
        <Link to='/chat' active={routed.chat}>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/chat' ? 'black' : 'gray'}>
            채팅
          </NoBorderBtn>
        </Link>
        <Link to='/mypage' active={routed.mypage}>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/mypage' ? 'black' : 'gray'}>
            마이 페이지
          </NoBorderBtn>
        </Link>
        <Link to='/login' active={routed.login}>
          <NoBorderBtn fontSize='1rem' palette={pathname === '/login' ? 'black' : 'gray'}>
            로그인
          </NoBorderBtn>
        </Link>
        <Link to='/signup'>
          <BorderBtn fontSize='1rem' palette='blue' marginLeft='1.2rem'>
            회원가입
          </BorderBtn>
        </Link>
      </FlexBox>
    </NavContainer>
  );
}
