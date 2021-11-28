/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import styled from 'styled-components';
import CardModal from './CardModal';
import CardBar from './SideBar/CardBar';

const SideWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 100%;
  flex: 0 0 auto;
`;

export default function SideBar() {
  const [isModal, setIsModal] = useState(false);
  const [modalInof, setModalInfo] = useState({});

  const modalClick = (cardId) => {
    // TODO GET /map/guide-card?guide-id=2
    console.log(cardId);

    setIsModal(true);
    setModalInfo({ title: `지하벙크 체험 ${cardId}` });
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
