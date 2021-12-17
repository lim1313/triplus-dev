import React, { useState } from 'react';
import styled from 'styled-components';
import GuideImg from './GuideImg';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { CardModalSubTitle } from '../../../styles/map/card';
import { v4 as uuid4 } from 'uuid';

const Wrapper = styled.div`
  height: 220px;
  width: 220px;
  margin: 0 auto;
  position: relative;
`;

const ImgWrapper = styled.div`
  margin: 0 auto;
  border-radius: 3px;
  overflow: hidden;
`;

const ImgUL = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  transition: all 0.5s;
  transform: translateX(${({ fromLeft }) => fromLeft + 'px'});
`;

const MoveBtn = styled.button`
  position: absolute;
  top: 50%;
  left: ${({ left }) => (left ? '-5%' : '105%')};
  transform: translate(-50%, -50%);

  border: none;
  font-size: 1.3rem;
  background-color: unset;
  border-radius: 7px;
  opacity: 0.7;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.lightGray};
  }
`;

export default function GuideImgs({ tourImage }) {
  const [fromLeft, setFromLeft] = useState(0);

  const moveImg = (direct) => {
    if (tourImage.length <= 1) return;
    if (direct === 'l' && fromLeft === 0) return;
    else if (direct === 'r' && fromLeft === -220 * (tourImage.length - 1)) return;

    if (direct === 'l') {
      let plusLeft = fromLeft + 220;
      setFromLeft(plusLeft);
    } else {
      let minusLeft = fromLeft - 220;
      setFromLeft(minusLeft);
    }
  };

  return (
    <div>
      <CardModalSubTitle>가이드 참고 사진</CardModalSubTitle>
      <Wrapper>
        <ImgWrapper>
          <ImgUL fromLeft={fromLeft}>
            {tourImage && tourImage.map((img) => <GuideImg key={uuid4()} img={img} />)}
          </ImgUL>
        </ImgWrapper>
        <MoveBtn left onClick={() => moveImg('l')}>
          <FaAngleLeft />
        </MoveBtn>
        <MoveBtn onClick={() => moveImg('r')}>
          <FaAngleRight />
        </MoveBtn>
      </Wrapper>
    </div>
  );
}
