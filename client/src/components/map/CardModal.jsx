/*eslint-disable no-unused-vars*/

import React from 'react';
import styled from 'styled-components';
import GuideContent from './cardModal/GuideContent';
import GuideImgs from './cardModal/GuideImgs';
import UserInfo from './cardModal/UserInfo';
import GuideBtn from './cardModal/GuideBtn';

const ModalWrapper = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  z-index: 2;

  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border: 3px solid ${({ theme }) => theme.color.lightGray};
  background-color: #fff;
  overflow: auto;

  @media ${({ theme }) => theme.device.mobile} {
    top: unset;
    bottom: 0;
    width: 100vw;
    height: calc(100vh - 2.5rem);
    transform: translateX(0);
    z-index: 998;
  }
`;

const Title = styled.h1`
  margin: 1rem 0;
  font-size: 2rem;
  text-align: center;
`;

export default function CardModal({ modalInof, closeModal }) {
  const { title, address, gender, guideDate, tourImage, userImage, nickName, openDate, content } =
    modalInof;

  return (
    <ModalWrapper>
      <button onClick={closeModal}>X</button>
      <Title>{title}</Title>
      <UserInfo nickName={nickName} gender={gender} guideDate={guideDate} userImage={userImage} />
      <GuideImgs tourImage={tourImage} />
      <GuideContent address={address} guideDate={guideDate} content={content} openDate={openDate} />
      <GuideBtn />
    </ModalWrapper>
  );
}
