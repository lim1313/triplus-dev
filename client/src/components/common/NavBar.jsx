/* eslint-disable react-hooks/exhaustive-deps */
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

const LogoWrapper = styled.div`
  display: flex;
  margin-left: 3rem;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    margin-left: 2rem;
  } ;
`;

const LogoImg = styled.img`
  width: 5rem;
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
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  } ;
`;

const MaxBtn = styled(NoBorderBtn)`
  height: 100%;
  /* box-shadow: ${({ active, theme }) =>
    active ? `0 2px 2px ${theme.color.blue}` : '0 2px 1px rgba(255, 255, 255, 0)'}; */
  font-size: 1rem;
  border-bottom: 3px solid
    ${({ active, theme }) => (active ? `${theme.color.blue}` : 'rgba(255, 255, 255, 0)')};
  @media screen and (max-width: 992px) {
    font-size: 0.85rem;
  }
`;

const NavBorderBtn = styled(BorderBtn)`
  font-size: 1rem;
  @media screen and (max-width: 992px) {
    font-size: 0.85rem;
  }
`;

export default function NavBar() {
  const initialRouted = {
    map: false,
    management: false,
    chat: false,
    mypage: false,
    login: false,
  };

  const [routed, setRouted] = useState(initialRouted);

  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.slice(1);
    setRouted({
      ...initialRouted,
      [path]: true,
    });
  }, [pathname]);

  return (
    <NavContainer>
      <LogoWrapper>
        <Link to='/'>
          <LogoImg src='./asset/logo/logo.png' alt='로고' />
        </Link>
      </LogoWrapper>
      <FlexBox marginRight='3rem'>
        <Link to='map'>
          <MaxBtn active={routed.map} palette={pathname === '/map' ? 'black' : 'gray'}>
            지도 Map
          </MaxBtn>
        </Link>
        <Link to='management'>
          <MaxBtn
            active={routed.management}
            palette={pathname === '/management' ? 'black' : 'gray'}
          >
            여행 관리
          </MaxBtn>
        </Link>
        <Link to='chat'>
          <MaxBtn active={routed.chat} palette={pathname === '/chat' ? 'black' : 'gray'}>
            채팅
          </MaxBtn>
        </Link>
        <Link to='mypage'>
          <MaxBtn active={routed.mypage} palette={pathname === '/mypage' ? 'black' : 'gray'}>
            마이 페이지
          </MaxBtn>
        </Link>
        <Link to='login'>
          <MaxBtn active={routed.login} palette={pathname === '/login' ? 'black' : 'gray'}>
            로그인
          </MaxBtn>
        </Link>
        <Link to='signup'>
          <NavBorderBtn palette='blue' marginLeft='1.2rem'>
            회원가입
          </NavBorderBtn>
        </Link>
      </FlexBox>
    </NavContainer>
  );
}
