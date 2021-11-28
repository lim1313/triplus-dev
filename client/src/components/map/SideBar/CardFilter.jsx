import React from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;

  background-color: powderblue;
`;

export default function CardFilter() {
  return (
    <FilterWrapper>
      <div>Date</div>
      <div>gender</div>
      <div>search box??</div>
    </FilterWrapper>
  );
}
