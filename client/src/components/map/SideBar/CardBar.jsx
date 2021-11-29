import React from 'react';
import styled from 'styled-components';
import CardFilter from './CardFilter';
import GuideCard from './GuideCard';

import { db } from '../../../db/guideCard';

const SideCardWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
  }
`;

const GuideCardsWrapper = styled.ul`
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    height: 80%;

    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;

export default function CardBar({ modalClick }) {
  return (
    <SideCardWrapper>
      <CardFilter />
      <GuideCardsWrapper>
        {db.map((cardInfo, index) => (
          <GuideCard key={index} cardInfo={cardInfo} modalClick={modalClick} />
        ))}
      </GuideCardsWrapper>
    </SideCardWrapper>
  );
}
