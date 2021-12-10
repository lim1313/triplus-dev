import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ApplicantCard from './ApplicantCard';

const CardsCtn = styled.div`
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    padding: 0;
    height: 100%;
  }
`;
const MoveBtn = styled.button`
  position: absolute;
  top: 50%;
  left: ${({ left }) => (left ? '2%' : '98%')};
  transform: translate(-50%, -50%);
  z-index: 999;

  border: none;
  font-size: 2rem;
  background-color: unset;
  border-radius: 7px;
  opacity: 0.7;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.lightGray};
  }
`;
const CardsWarpper = styled.div`
  width: 90%;
  display: flex;
  overflow: hidden;
  height: 100%;
  align-items: center;
`;

export default function ApplicantCards() {
  return (
    <CardsCtn>
      <MoveBtn left>
        <FaAngleLeft />
      </MoveBtn>
      <MoveBtn>
        <FaAngleRight />
      </MoveBtn>
      <CardsWarpper>
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
        <ApplicantCard />
      </CardsWarpper>
    </CardsCtn>
  );
}
