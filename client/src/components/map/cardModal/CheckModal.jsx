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
  transform: translateX(100%);
  z-index: 999;

  @media ${({ theme }) => theme.device.mobile} {
    top: unset;
    bottom: 0;
    width: 100vw;
    height: calc(100vh - ${({ theme }) => theme.size.navHeight});
    transform: translateX(0);
    z-index: 10;
  }
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
  color: ${({ theme, end }) => (end ? theme.color.red : theme.color.blue)};
  font-weight: 500;
`;

export default function CheckModal({ openMsg }) {
  return (
    <BackWrapper>
      <TitleWrapper>
        <ImgWrapper src='/asset/logo/logo.png' alt='triplus 로고' />
        {openMsg === 'success' ? (
          <>
            <Content>예약이 완료되었습니다</Content>
            <Content>즐거운 여행되세요</Content>
          </>
        ) : openMsg === 'end' ? (
          <>
            <Content end>예약이 이미 마감되었습니다</Content>
            <Content end>다음에 이용해 주세요</Content>
          </>
        ) : (
          <>
            <Content end>예약 중 서버문제가 발생했습니다</Content>
            <Content end>다음에 이용해 주세요</Content>
          </>
        )}
      </TitleWrapper>
    </BackWrapper>
  );
}
