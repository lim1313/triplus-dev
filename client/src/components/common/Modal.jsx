import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common';
import { Background, ModalTitle, ModalWrapper } from '../../styles/common/modal';

const Wrapper = styled(ModalWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ width }) => width || '26vw'};
  min-width: 22rem;
  height: ${({ height }) => height};
  min-height: 12rem;
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
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

export default function Modal({
  children,
  content,
  yesClick,
  noClick,
  onlyOne,
  firstBtn,
  secondBtn,
  width,
  height,
}) {
  return (
    <Background>
      <Wrapper width={width} height={height}>
        {children || (
          <>
            <ModalTitle>{content}</ModalTitle>
            <BtnWrapper>
              <SelectBtn onClick={yesClick}>{firstBtn || '확인'}</SelectBtn>
              {onlyOne || <SelectBtn onClick={noClick}>{secondBtn || '취소'}</SelectBtn>}
            </BtnWrapper>
          </>
        )}
      </Wrapper>
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
// 5) onlyOne : 확인 버튼만 필요한 경우
// 5) firstBtn : 첫번째 btn value
// 5) secondBtn : 두번째 btn value
