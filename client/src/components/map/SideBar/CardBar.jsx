/*eslint-disable no-unused-vars*/

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GuideCard from './GuideCard';

const SideCardWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  overflow: auto;
  padding-top: 12.5rem;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
    display: flex;
    height: 80%;
  }
`;

export default function CardBar({ modalClick }) {
  const cards = useSelector((state) => state.guideCardsReducer);

  return (
    <SideCardWrapper>
      {cards.map((cardInfo, index) => (
        <GuideCard key={index} cardInfo={cardInfo} modalClick={modalClick} />
      ))}
    </SideCardWrapper>
  );
}
