import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common';
import { Background, ModalTitle, ModalWrapper } from '../../styles/common/modal';

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3.5rem;
`;

const SelectBtn = styled(ColorBtn)`
  width: 7rem;
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.lightGray};
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  margin: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.color.blue};
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

export default function Modal({ content, yesClick, noClick }) {
  return (
    <Background>
      <ModalWrapper>
        <ModalTitle>{content}</ModalTitle>
        <BtnWrapper>
          <SelectBtn onClick={yesClick}>확인</SelectBtn>
          <SelectBtn onClick={noClick}>취소</SelectBtn>
        </BtnWrapper>
      </ModalWrapper>
    </Background>
  );
}
