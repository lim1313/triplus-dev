import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common';
import { Background, ModalTitle, ModalWrapper } from '../../styles/common/modal';

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const SelectBtn = styled(ColorBtn)`
  width: 50%;
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

export default function LoginModal({ yesClick, noClick, children, width }) {
  const spanStyle = {
    color: '#3386f7',
    fontWeight: 'bold',
  };
  return (
    <Background>
      <ModalWrapper width={width}>
        {children || (
          <>
            <ModalTitle>
              <span style={spanStyle}>로그인된 여행자님만</span> 이용이 가능합니다.
              <br /> 로그인 하시겠습니까?
            </ModalTitle>
            <BtnWrapper>
              <SelectBtn onClick={yesClick}>네, 로그인할래요!</SelectBtn>
              <SelectBtn onClick={noClick}>괜찮아요!</SelectBtn>
            </BtnWrapper>
          </>
        )}
      </ModalWrapper>
    </Background>
  );
}
