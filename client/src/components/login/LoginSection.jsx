import React from 'react';
import styled from 'styled-components';
import LoginBtns from './LoginBtns';
import LoginId from './LoginId';
import LoginPw from './LoginPw';

const SectionBlock = styled.div`
  max-width: 100%;
`;

export default function LoginSection() {
  return (
    <SectionBlock>
      <LoginId />
      <LoginPw />
      <LoginBtns />
    </SectionBlock>
  );
}
