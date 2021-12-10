import React, { useState } from 'react';
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
const CardUl = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  transition: all 0.5s;
  transform: translateX(${({ fromLeft }) => fromLeft + 'px'});
`;

export default function ApplicantCards({ appicantInfo }) {
  const [fromLeft, setFromLeft] = useState(0);
  // const [last, setLast] = useState(0);

  const moveImg = (direct) => {
    console.log(fromLeft);
    if (direct === 'l' && fromLeft >= 0) {
      return;
    } else if (direct === 'r' && fromLeft === -1148 + 861) {
      return;
    }

    if (direct === 'l') {
      let plusLeft = fromLeft + 287;
      setFromLeft(plusLeft);
    } else {
      let minusLeft = fromLeft - 287;
      setFromLeft(minusLeft);
    }
  };
  return (
    <CardsCtn>
      <MoveBtn left onClick={() => moveImg('l')}>
        <FaAngleLeft />
      </MoveBtn>
      <MoveBtn onClick={() => moveImg('r')}>
        <FaAngleRight />
      </MoveBtn>
      <CardsWarpper>
        <CardUl fromLeft={fromLeft}>
          <ApplicantCard appicantInfo={appicantInfo} />
          <ApplicantCard />
          <ApplicantCard />
          <ApplicantCard />
        </CardUl>
      </CardsWarpper>
    </CardsCtn>
  );
}
