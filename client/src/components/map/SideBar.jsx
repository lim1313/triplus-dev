/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { dbModal } from '../../db/guideModal';
import { getCardModal } from '../../network/map/http';
import { openGuideModal } from '../../redux/map/action';
import CardModal from './CardModal';
import CardBar from './sideBar/CardBar';

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
  const dispatch = useDispatch();
  const { isOpen, modalInfo } = useSelector((state) => state.guideModalReducer);

  const modalClick = (cardId) => {
    // TODO GET /map/guide-card?guide-id=cardId
    // getCardModal(cardId).then(res => {
    // xxx setModalInfo( res );
    // xxx setIsModal(true)
    //  dispatch(openGuideModal({ isOpen: true, modalInfo:res }));
    // })

    dispatch(openGuideModal({ isOpen: true, modalInfo: { ...dbModal, guideId: cardId } }));
  };

  const closeModal = () => {
    dispatch(openGuideModal({ isOpen: false }));
  };

  return (
    <SideWrapper>
      <CardBar modalClick={modalClick} />
      {isOpen && <CardModal modalInfo={modalInfo} closeModal={closeModal} />}
    </SideWrapper>
  );
}
