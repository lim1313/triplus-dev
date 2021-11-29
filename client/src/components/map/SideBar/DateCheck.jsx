import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import { BorderBtn } from '../../../styles/common';

const DateBtn = styled.div`
  position: relative;
`;

const Calendar = styled.div`
  position: absolute;
`;

export default function DateCheck() {
  const [openCal, setOpenCal] = useState(false);

  const isOpenCal = () => {
    setOpenCal(!openCal);
  };

  return (
    <DateBtn>
      <BorderBtn palette='black' className='date' onClick={isOpenCal}>
        <span>날짜</span>
        <FaCaretDown />
      </BorderBtn>
      {openCal && <Calendar>날짜체크</Calendar>}
    </DateBtn>
  );
}
