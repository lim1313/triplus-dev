import React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../../../styles/common/modal';

export const BackWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transform: translateX(100%);
`;

const ImgWrapper = styled.img`
  width: 60%;
`;

const TitleWrapper = styled(ModalWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.color.blue};
  font-weight: 500;
`;

export default function CheckModal() {
  const scrollEvent = (e) => {};

  return (
    <BackWrapper onScroll={scrollEvent}>
      <TitleWrapper>
        <ImgWrapper src='/asset/logo/logo.png' alt='triplus 로고' />
        <Content>예약이 완료되었습니다</Content>
        <Content>즐거운 여행되세요</Content>
      </TitleWrapper>
    </BackWrapper>
  );
}
