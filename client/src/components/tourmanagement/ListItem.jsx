import React from 'react';
import { Profile, UserNick } from '../../styles/map/card';
import styled from 'styled-components';
import {
  CardLi,
  GuideContent,
  GuideInfo,
  GuideWrapper,
  ImageWrapper,
  TitleWrapper,
} from '../map/sideBar/GuideCard';

const TourCardLi = styled(CardLi)`
  filter: none;
  .card-wrapper {
    filter: ${({ state }) => (state === 'COMPLETED' || state === 'CANCELED') && 'grayscale(100%)'};
  }
  &:hover {
    cursor: ${({ state }) => state === 'COMPLETED' && 'not-allowed'};
  }
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 130px;
    height: 130px;
    background: none;
    filter: none;
  }
  & h5 {
    position: absolute;
    left: 4%;
    top: 4%;
    margin-top: 0;
    color: ${({ theme }) => theme.color.red};
    background: #fff;
    border-radius: 5px;
    filter: none;
  }
`;

export default function ListItem({ guideInfo, handleTourCardClick }) {
  const getDday = () => {
    const [year, month, day] = guideInfo.guideDate.split('.');
    let today = new Date().getTime();
    let guideDay = new Date(+year, month - 1, +day).getTime();
    let gap = guideDay - today;
    let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
    return result;
  };
  return (
    <TourCardLi state={guideInfo && guideInfo.state} onClick={() => handleTourCardClick(guideInfo)}>
      {guideInfo && guideInfo.state === 'COMPLETED' && (
        <CardWrapper>
          <img src='/asset/main/stamp.png' alt='완료스탬프' />
        </CardWrapper>
      )}
      {guideInfo && guideInfo.state === 'CANCELED' && (
        <CardWrapper>
          <h5>*가이드에 의해 취소된 여행입니다.</h5>
        </CardWrapper>
      )}
      <div className='card-wrapper'>
        <ImageWrapper />
        <TitleWrapper>
          <div className='date'>
            {guideInfo && guideInfo.state === 'COMPLETED' ? 'END' : `D - ${getDday()}`}
          </div>
          <h2 className='title'>{guideInfo && guideInfo.title}</h2>
        </TitleWrapper>
        <GuideWrapper>
          <GuideInfo>
            <Profile width='80px' height='80px' mWidth='70px' mHeight='70px' marginRight='1rem' />
            <UserNick
              gender={guideInfo && guideInfo.gender}
              nickName={guideInfo && guideInfo.nickName}
            />
          </GuideInfo>
          <GuideContent>
            {guideInfo.content.length > 70
              ? guideInfo.content.slice(0, 70) + '...'
              : guideInfo.content}
          </GuideContent>
        </GuideWrapper>
      </div>
    </TourCardLi>
  );
}
