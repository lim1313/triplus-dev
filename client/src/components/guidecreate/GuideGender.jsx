import React from 'react';
import styled from 'styled-components';
import { ImMan, ImWoman } from 'react-icons/im';

const ToggleCtn = styled.div`
  width: 4rem;
  height: 1.7rem;
  border-radius: 1.5rem;
  background-color: #e8ecf6;
  position: relative;
  margin-bottom: 1rem;
  & .man {
    color: ${({ theme }) => theme.color.lightGray};
    position: absolute;
    top: 0.1rem;
    font-size: 1.5rem;
  }
  & .woman {
    color: ${({ theme }) => theme.color.red};
    position: absolute;
    right: 0;
    top: 0.1rem;
    font-size: 1.5rem;
  }
`;
const ToggleCircle = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.blue};
  position: absolute;
`;

export default function GuideGender() {
  return (
    <ToggleCtn>
      <ToggleCircle />
      <ImMan className='man' />
      <ImWoman className='woman' />
    </ToggleCtn>
  );
}
