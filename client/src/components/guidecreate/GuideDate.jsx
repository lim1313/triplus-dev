import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const CustomDatePicker = styled(DatePicker)`
  height: 1.5rem;
  border: none;
  background-color: ${({ theme }) => theme.color.inputColor};
`;

export default function GuideDate() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <CustomDatePicker
      locale={ko}
      startDate={startDate}
      selected={startDate}
      placeholderText='날짜를 선택하세요'
      onChange={(date) => setStartDate(date)}
      dateFormat='yyyy.MM.dd'
      minDate={new Date()}
    />
  );
}
