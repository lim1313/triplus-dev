import React from 'react';
import styled from 'styled-components';
import LoginHeader from './LoginHeader';
import LoginSection from './LoginSection';
import OauthLogin from './OauthLogin';

const TempleteBlock = styled.div`
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1rem 4rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding-bottom: 0;
  }
`;

export default function LoginTemplete() {
  return (
    <TempleteBlock>
      <LoginHeader />
      <LoginSection />
      <OauthLogin />
    </TempleteBlock>
  );
}
