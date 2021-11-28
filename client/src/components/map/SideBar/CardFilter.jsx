import React from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;

  @media ${({ theme }) => theme.device.mobile} {
    height: 20%;
    margin-bottom: 0;
  }
`;

export default function CardFilter() {
  return (
    <FilterWrapper>
      <h3>가이드 찾기</h3>
      <div>날짜</div>
      <div>성별</div>
    </FilterWrapper>
  );
}
