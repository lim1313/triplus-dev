/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { FilterFrame } from '../../../styles/map/filterFrame';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';

const FilterWrapper = styled(FilterFrame)`
  overflow: hidden;

  .react-datepicker__header {
    border-radius: 1rem 1rem 0 0;
    background-color: transparent;
  }
  .react-datepicker__current-month {
    color: ${({ theme }) => theme.color.lightBlue};
  }
  .react-datepicker__day-names {
    margin-top: -0.5rem;
  }
  .react-datepicker__day-name {
    font-size: 1rem;
    width: 2rem;
    line-height: 2rem;
    margin: 0.25rem;
  }

  .react-datepicker {
    border: 3px solid ${({ theme }) => theme.color.lightGray};
    opacity: 0.97;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  .react-datepicker__week {
    & * {
      border-radius: 0.4rem;
      font-size: 1rem;
      width: 2rem;
      line-height: 2rem;
      margin: 0.25rem;
    }
    .react-datepicker__day {
      :hover {
        background-color: ${({ theme }) => theme.color.lightBlue};
        opacity: 0.5;
      }
    }

    .react-datepicker__day--today {
      border: 1px solid ${({ theme }) => theme.color.lightGray};
    }

    .react-datepicker__day--in-range {
      background-color: ${({ theme }) => theme.color.blue};
      :hover {
        background-color: ${({ theme }) => theme.color.lightBlue};
      }
    }
  }
  .react-datepicker__close-icon::after {
    background-color: ${({ theme }) => theme.color.gray};
  }
`;

const DateFrame = styled(DatePicker)`
  border: none;
  text-align: center;
  width: 100%;
  font-size: 1rem;
  caret-color: transparent;
  &:focus {
    outline: none;
  }
`;

const CustomHeader = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    border-radius: 0.4rem;
    font-size: 1.5rem;
    border: none;
    line-height: 1.5rem;

    &:hover {
      cursor: pointer;
    }

    & .arrowIcon {
      font-size: 1.7rem;
    }
  }

  .left {
    margin-right: 1rem;
    background-color: unset;
  }
  .right {
    margin-left: 1rem;
    background-color: unset;
  }
`;

const MonthYearContainer = styled.div`
  display: flex;
  font-size: 1.2rem;

  & span {
    margin-right: 0.6rem;
    :last-of-type {
      margin-right: 0;
    }
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
        isClearable
        popperPlacement='bottom'
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CustomHeader>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className='left'>
              <FiChevronLeft className='arrowIcon' />
            </button>
            <MonthYearContainer>
              <span>{`${getYear(date)}년`}</span>
              <span>{`${getMonth(date) + 1}월`}</span>
            </MonthYearContainer>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className='right'>
              <FiChevronRight className='arrowIcon' />
            </button>
          </CustomHeader>
        )}
      />
    </FilterWrapper>
  );
}
