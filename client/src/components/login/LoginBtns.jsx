import React from 'react';
import styled from 'styled-components';
import { BorderBtn } from '../../styles/common';
import { useSelector } from 'react-redux';

const BtnsBlock = styled.div`
  display: flex;
  flex-direction: column;
  & div {
    display: flex;
    align-items: baseline;
    margin-top: 1rem;
    justify-content: space-between;
  }
  & span {
    display: inline-block;
    width: 17rem;
    color: ${({ theme }) => theme.color.red};
  }
`;

// const GuestLogin = styled(NoBorderBtn)`
//   text-align: right;
//   white-space: nowrap;
//   padding: 0;
//   padding-left: 5rem;
// `;
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

export default function LoginBtns(props) {
  const state = useSelector((state) => state.loginReducer);
  const { handleLoginClick, handleSignupClick } = props;
  return (
    <BtnsBlock>
      <div>
        <span>{state.message}</span>
      </div>
      <LoginBtn onClick={handleLoginClick}>로그인</LoginBtn>
      <SignupBtn onClick={handleSignupClick}>회원가입</SignupBtn>
    </BtnsBlock>
  );
}
