/* eslint-disable no-unused-vars */

import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import ImgFrame from '../../../styles/map/imgFram';

const CardLi = styled.li`
  width: 100%;
  height: 270px;
  margin-bottom: 1rem;
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;

  @media ${({ theme }) => theme.device.mobile} {
    flex: 0 0 auto;
    width: 200px;
    height: 100%;
    margin-bottom: 0;
  }
`;

const CardHead = styled.div`
  position: absolute;
  padding-right: 1rem;
  right: 0;
  text-align: right;

  & .date {
    display: inline;
    color: #fff;
    background-color: ${({ theme }) => theme.color.red};
    text-align: center;
    padding: 0 1rem;
  }
  & .title {
    color: #fff;
    text-shadow: 0 0 4px black;
    margin: 0;
  }
`;

export default function GuideCard({ cardInfo, modalClick }) {
  return (
    <CardLi onClick={() => modalClick(1)}>
      <ImgFrame width='100%' height='40%'>
        <img className='innerImg' src={cardInfo.tourImage} alt={`${cardInfo.title} 투어 이미지`} />
        <CardHead>
          {/* 현재 날짜와 계산 */}
          <div className='date'>{cardInfo.guide_date}</div>
          <h2 className='title'>{cardInfo.title}</h2>
        </CardHead>
      </ImgFrame>
      <div></div>
      <div></div>
    </CardLi>
  );
}
