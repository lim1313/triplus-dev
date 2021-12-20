import React from 'react';
import styled from 'styled-components';
import { Background, ModalWrapper, ModalTitle } from '../../styles/common/modal';
import { ColorBtn } from '../../styles/common/index';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/signup/action';
import { useNavigate } from 'react-router-dom';

const OkBtn = styled(ColorBtn)`
  width: 8rem;
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.lightGray};
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  flex: none;
  margin: 0.5rem;
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.lightGray};
  }
`;
const CancelBtn = styled(ColorBtn)`
  width: 8rem;
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.lightGray};
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  flex: none;
  margin: 0.5rem;
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const BtnBlock = styled.div`
  margin: 3rem auto;
  display: flex;
  justify-content: center;
`;

export default function SignupModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    dispatch(openModal());
  };
  const handleOkClick = () => {
    dispatch(openModal());
    navigate('/login');
  };
  return (
    <Background>
      <ModalWrapper>
        <ModalTitle>정말 취소하시겠습니까?</ModalTitle>
        <BtnBlock>
          <OkBtn onClick={handleOkClick}>확인</OkBtn>
          <CancelBtn onClick={handleCancelClick}>취소</CancelBtn>
        </BtnBlock>
      </ModalWrapper>
    </Background>
  );
}
