import React, { useState } from 'react';
import styled from 'styled-components';
import { FilterFrame } from '../../../styles/map/filterFrame';
import DateFilter from './DateFilter';
import { FaSearchLocation } from 'react-icons/fa';
import GenderFilter from './GenderFilter';

const FilterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.color.lightGray};
  & h3 {
    margin-top: 0;
  }
  z-index: 10;
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

export default function CardFilter({ filterSubmit }) {
  const [gender, setGender] = useState('');
  const [date, setDate] = useState([]);

  const filterClick = () => {
    let startDate = date[0];
    let endDate = date[1] === 'Invalid Date' ? null : date[1];

    filterSubmit(gender, startDate, endDate);
  };

  const changeGender = (data) => {
    setGender(data);
  };

  const changeDate = (data) => {
    setDate(data);
  };

  return (
    <FilterWrapper>
      <h3>가이드 찾기</h3>
      <Filter>
        <DateFilter changeDate={changeDate} />
        <div className='genderWrapper'>
          <GenderFilter changeGender={changeGender} />
          <SearchBtn width='40px' color='red' onClick={filterClick}>
            <FaSearchLocation />
          </SearchBtn>
        </div>
      </Filter>
    </FilterWrapper>
  );
}