/* eslint-disable no-unused-vars */

import React from 'react';
import styled from 'styled-components';

const CardLi = styled.li`
  width: 100%;
  height: 230px;
  background-color: #7fbb46;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.device.mobile} {
    flex: 0 0 auto;
    width: 200px;
    height: 100%;
    margin-bottom: 0;
  }
`;

export default function GuideCard({ cardInfo, modalClick }) {
  return (
    <CardLi onClick={() => modalClick(1)}>
      <div>{cardInfo.title}</div>;
    </CardLi>
  );
}
