import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ModalWrapper } from '../../../styles/common/modal';
import { BtnWrapper, SelectBtn } from '../../common/Modal';
import CheckModalContent from './CheckModalContent';

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

const TitleWrapper = styled(ModalWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ImgWrapper = styled.img`
  width: 60%;
`;

export const Content = styled.div`
  color: ${({ theme, end }) => (end ? theme.color.red : theme.color.blue)};
  font-weight: 500;
  font-weight: 700;
`;

export default function CheckModal({ openMsg, closeCheckModal }) {
  const navigate = useNavigate();

  const yesClick = () => {
    navigate('/login');
  };

  return (
    <BackWrapper>
      <TitleWrapper>
        {openMsg !== 'login' && <ImgWrapper src='/asset/logo/logo.png' alt='triplus 로고' />}
        {openMsg === 'success' ? (
          <CheckModalContent content1='예약이 완료되었습니다' content2='즐거운 여행되세요' />
        ) : openMsg === 'end' ? (
          <CheckModalContent
            end={true}
            content1='예약이 이미 마감되었습니다'
            content2='다음에 이용해 주세요'
          />
        ) : openMsg === 'same' ? (
          <CheckModalContent
            end={true}
            content1='이미 예약이 완료되었습니다'
            content2='즐거운 여행되세요'
          />
        ) : openMsg === 'main' ? (
          <CheckModalContent
            end={true}
            content1='본인의 가이드 카드를 신청할 수 없습니다'
            content2='즐거운 하루되세요'
          />
        ) : (
          openMsg === 'login' && (
            <>
              <Content>로그인 후 이용이 가능합니다</Content>
              <BtnWrapper>
                <SelectBtn onClick={yesClick} width>
                  로그인
                </SelectBtn>
                <SelectBtn onClick={closeCheckModal} width>
                  취소
                </SelectBtn>
              </BtnWrapper>
            </>
          )
        )}
      </TitleWrapper>
    </BackWrapper>
  );
}
