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
  width: ${({ width }) => width || '50%'};
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

export default function Modal({ children, content, yesClick, noClick, width }) {
  return (
    <Background>
      <ModalWrapper width={width}>
        {children || (
          <>
            <ModalTitle>{content}</ModalTitle>
            <BtnWrapper>
              <SelectBtn onClick={yesClick}>확인</SelectBtn>
              <SelectBtn onClick={noClick}>취소</SelectBtn>
            </BtnWrapper>
          </>
        )}
      </ModalWrapper>
    </Background>
  );
}

// yeji 20211209
// 기능 : modal의 기본 레이아웃 제공
// props
// 1) children : 모달 창 안에 custom한 레이아웃 작성
// 2) content : 모달 창 안의 title
// 3) yesClick, noClick : 확인, 취소 클릭 이벤트
// 4) width : 모달창의 custom 넓이
