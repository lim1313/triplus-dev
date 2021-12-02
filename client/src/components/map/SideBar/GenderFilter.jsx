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

export default function GenderFilter({ changeGender }) {
  return (
    <SelectBox
      name='gender'
      width='120px'
      defaultValue='가이드 성별'
      onChange={(e) => changeGender(e.target.value)}
    >
      <option value='가이드 성별' disabled>
        가이드 성별
      </option>
      <option value='1'>여성</option>
      <option value='0'>남성</option>
      <option value=''>모두</option>
    </SelectBox>
  );
}
