/* eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { Background, ModalWrapper, ModalTitle } from '../../styles/common/modal';
import { ColorBtn, BorderBtn } from '../../styles/common/index';

import { cancelGuide } from '../../network/admin/http';

const ModalContainer = styled(ModalWrapper)`
  width: 30rem;
  max-width: 30rem;
  height: 40rem;
  padding: 1.5rem 1.5rem;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 31rem;
  overflow: auto;
  padding: 1rem;
  box-shadow: 0 0 5px ${({ theme }) => theme.color.lightBlue};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 1rem 0;
  color: ${({ theme }) => theme.color.blue};
`;

const Content = styled.p`
  font-size: 1.2rem;
  margin: 0 1rem;
`;

const ImgBox = styled.div`
  padding: 1rem;
`;

const ContentImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${({ notice }) => (notice ? '2rem 2rem .5rem' : '2rem')};
`;

export default function GuideInfoModal({ selectedGuide, setSelectedGuide, setOpenModal }) {
  const [noticeModal, setNoticeModal] = useState(false);

  const outModal = () => {
    setSelectedGuide(null);
    setOpenModal(false);
  };

  const resetPage = () => {
    window.location.assign(window.location.href);
  };

  const deleteGuide = () => {
    cancelGuide(selectedGuide.guideId)
      .then((res) => {
        setNoticeModal(true);
      })
      .catch((err) => alert(err.response.data));
  };

  return (
    <Background>
      {noticeModal ? (
        <ModalWrapper>
          <ModalTitle fontSize='1.2rem'>정상적으로 취소되었습니다</ModalTitle>
          <ButtonContainer notice>
            <ColorBtn palette='blue' fontSize='1rem' onClick={resetPage}>
              나가기
            </ColorBtn>
          </ButtonContainer>
        </ModalWrapper>
      ) : (
        <ModalContainer>
          <InfoBox>
            <Title>제목</Title>
            <Content>{selectedGuide.title}</Content>
            <Title>작성자</Title>
            <Content>{selectedGuide.userId}</Content>
            <Title>내용</Title>
            <Content>{selectedGuide.content}</Content>
            <Title>이미지</Title>
            {selectedGuide.guide_images.length > 0 ? (
              selectedGuide.guide_images.map((el, i) => {
                return (
                  <ImgBox key={el.image}>
                    <ContentImg src={el.image} alt='가이드 이미지' />
                  </ImgBox>
                );
              })
            ) : (
              <Content>올린 사진이 없습니다</Content>
            )}
          </InfoBox>
          <ButtonContainer>
            <ColorBtn fontSize='1.5rem' width='10rem' onClick={outModal}>
              나가기
            </ColorBtn>
            <BorderBtn fontSize='1.5rem' width='10rem' palette='red' onClick={deleteGuide}>
              삭제
            </BorderBtn>
          </ButtonContainer>
        </ModalContainer>
      )}
    </Background>
  );
}
