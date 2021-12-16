import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GuideCard from './GuideCard';

const SideCardWrapper = styled.ul`
  padding: 1.5rem;
  margin-top: 12.5rem;
  height: calc(100% - 12.5rem);
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    height: auto;
    margin-top: 0;
    padding: 0;
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
export default memo(function CardBar() {
  const cards = useSelector((state) => state.guideCardsReducer);
  const ulRef = useRef();

  return (
    <SideCardWrapper ref={ulRef}>
      {cards.length ? (
        <>
          {cards.map((cardInfo) => (
            <GuideCard ulRef={ulRef} key={cardInfo.guideId} cardInfo={cardInfo} scroll />
          ))}
        </>
      ) : (
        <CardNone>가이드 카드가 없습니다</CardNone>
      )}
    </SideCardWrapper>
  );
});
