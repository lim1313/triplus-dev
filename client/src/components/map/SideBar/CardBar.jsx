import React from 'react';
import styled from 'styled-components';
import CardFilter from './CardFilter';
import GuideCards from './GuideCards';

const SideCardWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  overflow: auto;
`;

export default function CardBar({ modalClick }) {
  return (
    <SideCardWrapper>
      <CardFilter />
      <GuideCards modalClick={modalClick} />
    </SideCardWrapper>
  );
}
