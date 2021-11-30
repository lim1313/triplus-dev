import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { FilterFrame } from '../../../styles/map/filterFrame';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

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

function App() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  return (
    <FilterWrapper>
      <DateFrame
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        placeholderText='여행날짜를 선택하세요'
        locale={ko}
        dateFormat='yyyy년 MM월 dd일'
        minDate={new Date()}
        showDisabledMonthNavigation
        onChangeRaw={handleDateChangeRaw}
      />
    </FilterWrapper>
  );
}

export default App;
