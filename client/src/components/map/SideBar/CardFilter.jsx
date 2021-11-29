/*eslint-disable no-unused-vars*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { FilterFrame } from '../../../styles/map/filterFrame';
import DateFilter from './DateFilter';
import { FaSearchLocation } from 'react-icons/fa';
import GenderFilter from './GenderFilter';

const FilterWrapper = styled.div`
  display: inline-black;
  position: absolute;
  top: 0;
  left: 0;
  width: 360px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.color.lightGray};
  & h3 {
    margin-top: 0;
  }
  //! 조정 필요
  z-index: 999;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.1rem;
    width: 100vw;
    background-color: unset;
    & h3 {
      display: none;
    }
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;

  & .genderWrapper {
    display: flex;
    justify-content: space-between;
  }
`;

const SearchBtn = styled(FilterFrame).attrs({
  as: 'button',
})`
  border: none;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.color.lightRed};
    color: ${({ theme }) => theme.color.darkGray};
  }

  @media ${({ theme }) => theme.device.mobile} {
    border: 3px solid ${({ theme }) => theme.color.lightGray};
  }
`;

export default function CardFilter() {
  const filterClick = (e) => {
    console.log(e);
  };

  return (
    <FilterWrapper>
      <h3>가이드 찾기</h3>
      <Filter>
        <DateFilter />
        <div className='genderWrapper'>
          <GenderFilter />
          <SearchBtn width='40px' color='red' onClick={filterClick}>
            <FaSearchLocation />
          </SearchBtn>
        </div>
      </Filter>
    </FilterWrapper>
  );
}
