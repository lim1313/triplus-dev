import React from 'react';
import styled from 'styled-components';
import { BorderBtn } from '../../styles/common';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/signup/action';

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

const CancelBtn = styled(BorderBtn)`
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

export default function SIgnupBtns(props) {
  const { handleSignupClick } = props;
  const dispatch = useDispatch();
  const handleCancelClick = () => {
    dispatch(openModal());
  };
  return (
    <BtnsBlock>
      <SignupBtn onClick={handleSignupClick}>회원가입</SignupBtn>
      <CancelBtn onClick={handleCancelClick}>취소</CancelBtn>
    </BtnsBlock>
  );
}
