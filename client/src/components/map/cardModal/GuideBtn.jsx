import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../../styles/common';

const ModalBottomBtn = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
`;

const ModalBtn = styled(ColorBtn)`
  flex-grow: 1;
  color: ${({ chatting, theme }) => chatting && theme.color.blue};
`;

export default function GuideBtn() {
  return (
    <ModalBottomBtn>
      <ModalBtn palette='blue'>신청하기</ModalBtn>
      <ModalBtn palette='lightGray' chatting>
        채팅하기
      </ModalBtn>
    </ModalBottomBtn>
  );
}
