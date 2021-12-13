import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ApplicantCard from './ApplicantCard';

const CardsCtn = styled.div`
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: relative;
  & .no-applicant {
    padding-top: 2rem;
  }
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
  /* flex-wrap: nowrap; */
  transition: all 0.5s;
  width: 100%;
  transform: translateX(${({ fromLeft }) => fromLeft + 'px'});
  @media ${({ theme }) => theme.device.mobile} {
    height: 160px;
    align-items: center;
  }
`;

export default function ApplicantCards({ applicantInfo }) {
  const [fromLeft, setFromLeft] = useState(0);
  // const [last, setLast] = useState(0);
  const cardRef = useRef();

  const moveImg = (direct) => {
    console.log(fromLeft);
    // console.log(cardRef.current.offsetWidth);
    const cardWidth = cardRef.current.offsetWidth;
    if (direct === 'l' && fromLeft >= 0) {
      return;
    } else if (direct === 'r' && fromLeft <= -((cardWidth + 12) * 4) + (cardWidth + 12) * 3) {
      // width * 신청자 개수, width*3
      return;
    }

    if (direct === 'l') {
      let plusLeft = fromLeft + (cardWidth + 12);
      setFromLeft(plusLeft);
    } else {
      let minusLeft = fromLeft - (cardWidth + 12);
      setFromLeft(minusLeft);
    }
  };
  return (
    <CardsCtn>
      {applicantInfo.length > 0 ? (
        <>
          <MoveBtn left onClick={() => moveImg('l')}>
            <FaAngleLeft />
          </MoveBtn>
          <MoveBtn onClick={() => moveImg('r')}>
            <FaAngleRight />
          </MoveBtn>
          <CardsWarpper>
            <CardUl fromLeft={fromLeft}>
              {applicantInfo.length > 0 &&
                applicantInfo.map((applicant) => (
                  <ApplicantCard applicant={applicant} key={applicant.nickName} cardRef={cardRef} />
                ))}
            </CardUl>
          </CardsWarpper>
        </>
      ) : (
        <div className='no-applicant'>신청자 정보가 없습니다.</div>
      )}
    </CardsCtn>
  );
}
