/* eslint-disable no-unused-vars */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import GuideCard from './GuideCard';
import { dbModal } from '../../../db/guideModal';
import { getCardModal } from '../../../network/map/http';
import { openGuideModal } from '../../../redux/map/action';

const SideCardWrapper = styled.ul`
  padding: 1.5rem;
  padding-top: 12.5rem;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    padding: 0;
    height: 100%;
  }
`;

const CardNone = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.darkGray};
  @media ${({ theme }) => theme.device.mobile} {
    background-color: ${({ theme }) => theme.color.lightRed};
    padding: 0;
    flex: 1 0 auto;
  }
`;
export default function CardBar() {
  const cards = useSelector((state) => state.guideCardsReducer);
  const { modalInfo } = useSelector((state) => state.guideModalReducer);
  const dispatch = useDispatch();

  const modalClick = (cardId) => {
    // TODO GET /map/guide-card?guide-id=cardId
    // getCardModal(cardId).then(res => {
    //  dispatch(openGuideModal({ isOpen: true, modalInfo:res }));
    // })
    dispatch(openGuideModal({ isOpen: true, modalInfo: { ...dbModal, guideId: cardId } }));
  };

  return (
    <SideCardWrapper>
      {cards.length ? (
        <>
          {cards.map((cardInfo) => (
            <GuideCard
              key={cardInfo.guideId}
              cardInfo={cardInfo}
              modalClick={modalClick}
              modalId={modalInfo && modalInfo.guideId === cardInfo.guideId && true}
            />
          ))}
        </>
      ) : (
        <CardNone>가이드 카드가 없습니다</CardNone>
      )}
    </SideCardWrapper>
  );
}
