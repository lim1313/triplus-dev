/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { dbModal } from '../../db/guideModal';
import { getCardModal } from '../../network/map/http';
import CardModal from './CardModal';
import CardBar from './SideBar/CardBar';

const SideWrapper = styled.aside`
  position: relative;
  flex: 0 0 auto;
  width: 320px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightGray};

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: auto;
  }
`;

export default function SideBar() {
  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const modalClick = (cardId) => {
    // TODO GET /map/guide-card?guide-id=cardId
    // getCardModal(cardId).then(res => {
    // setModalInfo( res );
    // setIsModal(true)
    // })

    setIsModal(true);
    setModalInfo({ ...dbModal });
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <SideWrapper>
      <CardBar modalClick={modalClick} />
      {isModal && <CardModal modalInfo={modalInfo} closeModal={closeModal} />}
    </SideWrapper>
  );
}
