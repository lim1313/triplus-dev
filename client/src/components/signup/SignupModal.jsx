import React from 'react';
import styled from 'styled-components';
import { Background, ModalWrapper, ModalTitle } from '../../styles/common/modal';
import { ColorBtn } from '../../styles/common/index';

const OkBtn = styled(ColorBtn)`
  width: 8rem;
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.lightGray};
  border: 1px solid ${({ theme }) => theme.color.lightGray};
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
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const BtnBlock = styled.div`
  margin: 3rem auto;
  display: flex;
  justify-content: space-evenly;
`;

export default function SignupModal() {
  return (
    <Background>
      <ModalWrapper>
        <ModalTitle>정말 취소하시겠습니까?</ModalTitle>
        <BtnBlock>
          <OkBtn>확인</OkBtn>
          <CancelBtn>취소</CancelBtn>
        </BtnBlock>
      </ModalWrapper>
    </Background>
  );
}
