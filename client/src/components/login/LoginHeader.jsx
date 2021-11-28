import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
  max-width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 200px;
  }
`;

export default function LoginHeader() {
  return (
    <HeaderBlock>
      <img src='/asset/logo/logo.png' alt='로고' />
    </HeaderBlock>
  );
}
