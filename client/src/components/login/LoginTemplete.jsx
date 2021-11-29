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
  padding: 4rem 1rem 2rem 1rem;
`;

export default function LoginTemplete(props) {
  return (
    <TempleteBlock>
      <LoginHeader />
      <LoginSection />
      <OauthLogin />
    </TempleteBlock>
  );
}
