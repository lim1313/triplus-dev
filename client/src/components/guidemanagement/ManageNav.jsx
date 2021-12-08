import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { NoBorderBtn } from '../../styles/common/index';

const NavCtn = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  height: 2rem;
`;
const LinkBtn = styled(NoBorderBtn)`
  color: ${({ theme }) => theme.color.lightGray};
  font-weight: 400;
  font-size: 1.1rem;
  box-sizing: border-box;
  height: 2rem;
  line-height: 2rem;
  ${({ active }) =>
    active &&
    css`
      font-weight: 600;
      font-size: 1.2rem;
      color: #fff;
      /* border-bottom: 1px solid #fff; */
      box-sizing: border-box;
      & span {
        border-bottom: 1px solid #fff;
      }
    `}
  &:hover {
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
    /* border-bottom: 1px solid #fff; */
    box-sizing: border-box;
    & span {
      border-bottom: 1px solid #fff;
    }
  }
  &:active {
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
    /* border-bottom: 1px solid #fff; */
    box-sizing: border-box;
    & span {
      border-bottom: 1px solid #fff;
    }
  }
`;

export default function ManageNav(props) {
  const { clicked } = props;
  return (
    <NavCtn>
      <Link to='/management'>
        <LinkBtn className='guideBtn' active={clicked.management}>
          <span>가이드 모드</span>
        </LinkBtn>
      </Link>
      <Link to='/management/tourlist'>
        <LinkBtn className='touristBtn' active={clicked.managementtourlist}>
          <span>여행자 모드</span>
        </LinkBtn>
      </Link>
    </NavCtn>
  );
}
