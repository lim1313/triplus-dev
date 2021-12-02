import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NoBorderBtn } from '../../styles/common/index';

const NavCtn = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
  height: 3rem;
`;
const LinkBtn = styled(NoBorderBtn)`
  color: ${({ theme }) => theme.color.lightGray};
  font-weight: 400;
  font-size: 1.1rem;
  box-sizing: border-box;
  height: 2rem;
  &:hover {
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
    height: 2rem;
  }
`;

export default function ManageNav() {
  return (
    <NavCtn>
      <Link to='/management'>
        <LinkBtn>가이드 모드</LinkBtn>
      </Link>
      <Link to='/tourmanagement'>
        <LinkBtn>여행자모드</LinkBtn>
      </Link>
    </NavCtn>
  );
}
