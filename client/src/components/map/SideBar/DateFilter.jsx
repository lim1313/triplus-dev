/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { FilterFrame } from '../../../styles/map/filterFrame';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import dayjs from 'dayjs';

const FilterWrapper = styled(FilterFrame)`
  overflow: hidden;
`;

const DateFrame = styled(DatePicker)`
  border: none;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export default function DateFilter({ changeDate }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const dateChange = (update) => {
    setDateRange(update);
    changeDate([dayjs(update[0]).format('YYYY.MM.DD'), dayjs(update[1]).format('YYYY.MM.DD')]);
  };

  return (
    <FilterWrapper>
      <DateFrame
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        placeholderText='여행날짜를 선택하세요'
        locale={ko}
        minDate={new Date()}
        showDisabledMonthNavigation
        dateFormat='yyyy.MM.dd'
        onChange={(update) => dateChange(update)}
        onChangeRaw={handleDateChangeRaw}
      />
    </FilterWrapper>
  );
}
