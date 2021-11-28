/* eslint-disable no-unused-vars */

import React from 'react';
import styled from 'styled-components';
import GuideCard from './GuideCard';

const CardLi = styled.li`
  width: 100%;
  height: 230px;
  background-color: #7fbb46;
  margin-bottom: 1rem;
`;

export default function GuideCards({ modalClick }) {
  return (
    <ul>
      <CardLi onClick={() => modalClick(1)}>
        <GuideCard />
      </CardLi>
      <CardLi onClick={() => modalClick(2)}>
        <GuideCard />
      </CardLi>
      <CardLi onClick={() => modalClick(3)}>
        <GuideCard />
      </CardLi>
    </ul>
  );
}
