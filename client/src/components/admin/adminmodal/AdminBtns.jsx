import React from 'react';
import styled from 'styled-components';
import { BorderBtn } from '../../../styles/common';
import { useSelector } from 'react-redux';

const BtnsBlock = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    display: inline-block;
    width: 17rem;
    color: ${({ theme }) => theme.color.red};
  }
`;

const LoginBtn = styled(BorderBtn)`
  height: 7vh;
  margin-top: 20px;
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    color: white;
  }
`;
const CancelBtn = styled(BorderBtn)`
  height: 7vh;
  margin-top: 20px;
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    color: white;
  }
`;

export default function AdminBtns(props) {
  const { handleLoginClick, handleCancelClick } = props;
  const state = useSelector((state) => state.adminReducer);
  return (
    <BtnsBlock>
      <span>{state.message}</span>
      <LoginBtn onClick={handleLoginClick}>로그인</LoginBtn>
      <CancelBtn onClick={handleCancelClick}>취소</CancelBtn>
    </BtnsBlock>
  );
}
