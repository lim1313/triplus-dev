import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { HeaderBlock } from '../../styles/login/Block';

const AlertMsg = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.color.lightGray};
  border-radius: 1rem;
  padding: 0.4rem;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    padding: 0.3rem;
    top: 0;
    transform: translateY(-50%);
  }
`;

export default function LoginHeader() {
  const { state } = useLocation();

  return (
    <HeaderBlock>
      <img src='/asset/logo/logo.png' alt='로고' />
      {state && <AlertMsg>{state.logout}</AlertMsg>}
    </HeaderBlock>
  );
}
