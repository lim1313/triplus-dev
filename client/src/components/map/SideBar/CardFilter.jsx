/*eslint-disable no-unused-vars*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFemale } from 'react-icons/fa';
import { FaMale } from 'react-icons/fa';

const FilterWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;

  @media ${({ theme }) => theme.device.mobile} {
    height: 20%;
    margin-bottom: 0;
  }
`;

const GenderWrapper = styled.form`
  display: inline;
  font-size: 1.5rem;

  & .female {
    background-color: ${({ theme }) => theme.color.red};
    border-radius: 50%;
  }

  & .male {
    background-color: ${({ theme }) => theme.color.blue};
    border-radius: 50%;
  }

  & .radio {
    & input[type='radio'] {
      display: none;
    }
  }
`;

export default function CardFilter() {
  const [gender, setGender] = useState();
  const [guideDate, setGuideDate] = useState();

  return (
    <FilterWrapper>
      <h3>가이드 찾기</h3>
      <button>날짜</button>
      <GenderWrapper>
        {/* 0 : male / 1 :female */}
        {[0, 1].map((value) => (
          <span key={value} className='radio'>
            <input type='radio' id={value} name='gender' value={value} />
            <label htmlFor={value}>
              {value ? <FaFemale className='female' /> : <FaMale className='male' />}
            </label>
          </span>
        ))}
      </GenderWrapper>
      {/* 적용하면 현재 card state에서 state를 필터링(서버 통신 X) */}
      <button>적용하기</button>
    </FilterWrapper>
  );
}
