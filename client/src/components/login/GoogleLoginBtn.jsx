import React from 'react';
import styled from 'styled-components';
import { ButtonBlock, OauthBtn } from '../../styles/login/OauthBtn';

const GoogleBtn = styled(OauthBtn)`
  box-shadow: 3px 3px 5px ${({ theme }) => theme.color.lightGray},
    -3px -3px 5px ${({ theme }) => theme.color.lightGray};
  /* border: 0.2px solid ${({ theme }) => theme.color.lightGray}; */
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 2rem;
    /* margin: auto; */
  }
`;

export default function GoogleLoginBtn() {
  const handleSignGoogle = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}/googlecallback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
    );
  };
  return (
    <ButtonBlock>
      <GoogleBtn onClick={handleSignGoogle}>
        <img src='asset/logo/g-logo.png' alt='구글로그인버튼' className='oauth-btn' />
      </GoogleBtn>
      <span>
        구글
        <br />
        로그인
      </span>
    </ButtonBlock>
  );
}
