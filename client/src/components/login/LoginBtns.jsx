import React from 'react';
import styled from 'styled-components';
import { BorderBtn, NoBorderBtn } from '../../styles/common';

const BtnsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuestLogin = styled(NoBorderBtn)`
  text-align: right;
  white-space: nowrap;
  padding: 0;
  margin-top: 20px;
`;
const LoginBtn = styled(BorderBtn)`
  height: 7vh;
  margin-top: 20px;
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    color: white;
  }
`;
const SignupBtn = styled(BorderBtn)`
  height: 7vh;
  margin-top: 20px;
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    color: white;
  }
`;

export default function LoginBtns() {
  return (
    <BtnsBlock>
      <GuestLogin>게스트로&nbsp;로그인하기</GuestLogin>
      <LoginBtn>로그인</LoginBtn>
      <SignupBtn>회원가입</SignupBtn>
    </BtnsBlock>
  );
}
