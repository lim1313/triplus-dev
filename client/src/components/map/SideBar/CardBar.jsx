/*eslint-disable no-unused-vars*/

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { db } from '../../../db/guideModal';
import GuideCard from './GuideCard';

const SideCardWrapper = styled.ul`
  padding: 1.5rem;
  padding-top: 12.5rem;
  height: 100%;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
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
export default function CardBar({ modalClick }) {
  // const cards = useSelector((state) => state.guideCardsReducer);

  //! dummy db
  let cards = db;

  return (
    <SideCardWrapper>
      {cards.length ? (
        <>
          {cards.map((cardInfo) => (
            <GuideCard key={cardInfo.guideId} cardInfo={cardInfo} modalClick={modalClick} />
          ))}
        </>
      ) : (
        <CardNone>생성된 카드가 없습니다</CardNone>
      )}
    </SideCardWrapper>
  );
}
