import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const Wrapper = styled.div`
  width: 11rem;
  height: 10rem;
  .react-datepicker__header {
    height: 2rem;
    border-radius: 1rem 1rem 0 0;
    background-color: transparent;
  }
  .react-datepicker__current-month {
    color: ${({ theme }) => theme.color.lightBlue};
  }
  .react-datepicker__month-container {
    width: 11rem;
    height: 13rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .react-datepicker__week {
    width: 11rem;
    padding: 0;
  }
  .react-datepicker__day-name {
    width: 1rem;
  }
  .react-datepicker__month {
    width: 11rem;
  }
  .react-datepicker__day {
    width: 1rem;
    height: 1rem;
  }
  .react-datepicker__day--selected {
    height: 1.5rem;
    background-color: ${({ theme }) => theme.color.blue};
  }
`;

const CustomDatePicker = styled(DatePicker)`
  height: 1.5rem;
  border: none;
  background-color: ${({ theme }) => theme.color.inputColor};
`;

export default function GuideDate(props) {
  const { handleDateChange, startDate } = props;
  return (
    <Wrapper>
      <CustomDatePicker
        locale={ko}
        startDate={startDate}
        selected={startDate}
        placeholderText='날짜를 선택하세요'
        onChange={handleDateChange}
        dateFormat='yyyy.MM.dd'
        minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
        inline
        id='date'
      />
    </Wrapper>
  );
}
