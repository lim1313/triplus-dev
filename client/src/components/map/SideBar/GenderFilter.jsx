import React from 'react';
import styled from 'styled-components';
import { FilterFrame } from '../../../styles/map/filterFrame';

const SelectBox = styled(FilterFrame).attrs({
  as: 'select',
})`
  border: none;

  @media ${({ theme }) => theme.device.mobile} {
    border: 3px solid ${({ theme }) => theme.color.lightGray};
  }
`;

export default function GenderFilter() {
  return (
    <SelectBox name='gender' width='120px'>
      <option disabled selected>
        가이드 성별
      </option>
      <option value='female'>여성</option>
      <option value='male'>남성</option>
      <option value='all'>모두</option>
    </SelectBox>
  );
}
