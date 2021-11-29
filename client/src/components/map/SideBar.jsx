/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import styled from 'styled-components';
import CardModal from './CardModal';
import CardBar from './SideBar/CardBar';

const SideWrapper = styled.aside`
  position: relative;
  width: 360px;
  height: 100%;
  flex: 0 0 auto;
  background-color: ${({ theme }) => theme.color.lightGray};

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 28vh;
  }
`;

export default function SideBar() {
  const [isModal, setIsModal] = useState(false);
  const [modalInof, setModalInfo] = useState({});

  const modalClick = (cardId) => {
    // TODO GET /map/guide-card?guide-id=cardId

    setIsModal(true);
    setModalInfo({
      title: ' 지하벙커 체험',
      gender: 'female',
      latitude: 37.495218625,
      longitude: 126.955101761,
      tourImage: ['./../../tourImage.png', './../../tourImage.png'],
      userImage: './../../userImage.png',
      guideDate: 20201230,
      guideId: 2,
      state: '1', // => (예약 진행중)
      openDate: '20200203에 오픈합니다',
      content: '지하벙커 체험을 해보세요',
      startTime: '14:00',
      endTime: '16:00',
      numPeople: 4,
      address: '대전 중구 00동 00아파트',
    });
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <SideWrapper>
      <CardBar modalClick={modalClick} />
      {isModal && <CardModal modalInof={modalInof} closeModal={closeModal} />}
    </SideWrapper>
  );
}
