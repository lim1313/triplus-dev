import React from 'react';
import styled, { css } from 'styled-components';
import { ColorBtn } from '../../styles/common/index';

const FilterCtn = styled.div`
  /* width: 100%; */
  margin: 1.5rem 0 2rem 0;
`;
const FilterBtn = styled(ColorBtn)`
  background-color: ${({ theme }) => theme.color.gray};
  border: none;
  border-radius: 0;
  margin-right: 0.2rem;
  padding: 0.5rem;
  width: 6rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.lightGray};
  }
  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.color.blue};
      color: ${({ theme }) => theme.color.lightGray};
    `}
`;

export default function TourFilter(props) {
  const { handleApprovedClick, handleCompletedClick, isActive } = props;
  return (
    <FilterCtn>
      <FilterBtn onClick={handleApprovedClick} active={isActive && isActive.approved}>
        예정된 여행
      </FilterBtn>
      <FilterBtn onClick={handleCompletedClick} active={isActive && isActive.completed}>
        지난 여행
      </FilterBtn>
    </FilterCtn>
  );
}
