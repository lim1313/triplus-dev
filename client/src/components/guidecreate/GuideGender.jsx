import React from 'react';
import styled, { css } from 'styled-components';
import { ImMan, ImWoman } from 'react-icons/im';

const GenderCtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ToggleCtn = styled.div`
  width: 4rem;
  height: 1.7rem;
  border-radius: 1.5rem;
  background-color: #e8ecf6;
  position: relative;
  margin-bottom: 1rem;
  & .man {
    position: absolute;
    top: 0.1rem;
    font-size: 1.5rem;
    left: 0.1rem;
    ${({ isGender }) =>
      isGender === false
        ? css`
            color: ${({ theme }) => theme.color.lightGray};
          `
        : css`
            color: ${({ theme }) => theme.color.blue};
          `}
  }
  & .woman {
    position: absolute;
    right: 0;
    top: 0.1rem;
    font-size: 1.5rem;
    ${({ isGender }) =>
      isGender === true
        ? css`
            color: ${({ theme }) => theme.color.lightGray};
          `
        : css`
            color: ${({ theme }) => theme.color.red};
          `}
  }
`;
const ToggleCircle = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  /* background-color: ${({ theme }) => theme.color.blue}; */
  ${({ isGender }) =>
    isGender === false
      ? css`
          background-color: ${({ theme }) => theme.color.blue};
          position: absolute;
        `
      : css`
          background-color: ${({ theme }) => theme.color.red};
          position: absolute;
          right: 0;
        `}
`;

export default function GuideGender(props) {
  const { isGender, handleGenderClick } = props;
  return (
    <GenderCtn>
      <span>성별&nbsp;</span>
      <ToggleCtn onClick={handleGenderClick} isGender={isGender}>
        <ToggleCircle isGender={isGender} />
        <ImMan className='man' />
        <ImWoman className='woman' />
      </ToggleCtn>
    </GenderCtn>
  );
}
