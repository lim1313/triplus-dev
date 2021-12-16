import React from 'react';
import styled from 'styled-components';
import { SiNaver } from 'react-icons/si';
import { ButtonBlock, OauthBtn } from '../../styles/login/OauthBtn';

const NaverBtn = styled(OauthBtn)`
  /* background-color: #1dc612; */
  color: #1dc612;
  font-size: 3rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function NaverLogin() {
  const handleSignNaver = () => {
    window.location.href = `${process.env.REACT_APP_HTTPSURL}/oauth/naver`;
  };
  return (
    <ButtonBlock>
      <NaverBtn onClick={handleSignNaver}>
        <SiNaver className='oauth-btn' />
      </NaverBtn>
      <span>
        네이버
        <br />
        로그인
      </span>
    </ButtonBlock>
  );
}
