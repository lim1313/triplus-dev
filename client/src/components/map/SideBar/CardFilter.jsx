/*eslint-disable no-unused-vars*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFemale, FaMale, FaCaretDown } from 'react-icons/fa';
import { BorderBtn, ColorBtn } from '../../../styles/common';
import DateCheck from './DateCheck';

const FilterWrapper = styled.div`
  width: 100%;
  & h3 {
    margin-top: 0;
  }

  margin-bottom: 2rem;

  @media ${({ theme }) => theme.device.mobile} {
    height: 20%;
    margin-bottom: 0;
  }
`;

const Filter = styled.div`
  display: flex;

  & .date {
    margin-right: 1rem;
  }
`;

const GenderWrapper = styled.span`
  & input[type='checkbox'] {
    display: none;
  }

  & input[type='checkbox'] + label {
    padding: 0.2rem 0.4rem;
    display: inline-block;
    cursor: pointer;
    transition: all 0.1s ease;
    border-radius: 1rem;
    background-color: ${({ gender, theme }) => (gender ? theme.color.red : theme.color.blue)};
    opacity: 0.5;
  }

  & input[type='checkbox']:checked + label {
    background-color: ${({ gender, theme }) => (gender ? theme.color.red : theme.color.blue)};
    opacity: 1;
  }

  & input[type='checkbox'] + label:hover {
    background-color: ${({ gender, theme }) => (gender ? theme.color.red : theme.color.blue)};
    opacity: 1;
  }
`;

export default function CardFilter() {
  const [gender, setGender] = useState();
  const [guideDate, setGuideDate] = useState();

  return (
    <FilterWrapper>
      <h3>가이드 찾기</h3>
      <Filter>
        <DateCheck />
        {/* 0 : male / 1 :female */}
        <div>
          {[0, 1].map((value) => (
            <GenderWrapper key={value} gender={value}>
              <input type='checkbox' id={value} name='gender' value={value} />
              <label htmlFor={value}>
                {value ? <FaFemale className='female' /> : <FaMale className='male' />}
              </label>
            </GenderWrapper>
          ))}
        </div>
        {/* 적용하면 현재 card state에서 state를 필터링(서버 통신 X) */}
        <ColorBtn palette='blue' marginLeft='4.5rem'>
          적용하기
        </ColorBtn>
      </Filter>
    </FilterWrapper>
  );
}
