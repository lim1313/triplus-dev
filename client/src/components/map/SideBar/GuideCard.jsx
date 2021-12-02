/* eslint-disable no-unused-vars */

import React from 'react';
import styled from 'styled-components';
import { Profile } from '../../../styles/map/card';

const CardLi = styled.li`
  width: 100%;
  height: 225px;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 9px -1px rgba(46, 46, 46, 0.57);

  @media ${({ theme }) => theme.device.mobile} {
    flex: 0 0 auto;
    height: 100%;
    width: 200px;
    margin: 6px;
    height: 175px;

    &:not(:last-of-type) {
      margin-right: 6px;
      margin-bottom: unset;
    }
  }
`;

const ImageFrame = styled.div`
  flex-basis: 40%;
  background: url(${({ backImage }) => backImage}) no-repeat center;
  background-size: cover;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & .date {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #fff;
    background-color: ${({ theme }) => theme.color.red};
    padding: 0 1rem;
    text-align: center;
  }

  & .title {
    color: #fff;
    text-align: right;
    margin: 0;
    text-shadow: 0 0 3px black;
    word-break: keep-all;
  }

  & .date,
  & .title {
    margin-right: 1rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    flex-basis: 60%;
    align-items: unset;
    justify-content: center;

    & .date,
    & .title {
      margin: unset;
    }

    & .title {
      flex: 1;
      font-size: 1.5rem;
      text-align: center;
      text-shadow: 0 0 3px black;
    }
  }
`;

const GuideInfo = styled.div`
  position: absolute;
  display: flex;
  padding: 1rem;
  top: 43px;
  align-items: flex-end;

  & .nick {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.gray};
  }
  & .nickName {
    font-weight: 800;
  }

  @media ${({ theme }) => theme.device.mobile} {
    align-items: center;
    top: 80px;

    & .nickName {
      font-weight: 800;
      font-size: 0.7rem;
    }
  }
`;

const GuideContent = styled.div`
  padding: 1rem;
  margin-top: 2.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.gray};

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export default function GuideCard({ cardInfo, modalClick }) {
  const { title, gender, guideDate, tourImage, userImage, state, nickName, content, guideId } =
    cardInfo;

  // 마감기한 => 빨강 파랑
  // 성별 표시
  // 마감 회색 표시

  return (
    <CardLi onClick={() => modalClick(guideId)}>
      <ImageFrame backImage={tourImage}>
        <div className='date'>D-{guideDate}</div>
        <h2 className='title'>{title}</h2>
      </ImageFrame>
      <GuideInfo>
        <Profile
          userImg={userImage}
          width='80px'
          height='80px'
          mWidth='70px'
          mHeight='70px'
          marginRight='1rem'
        />
        <div>
          <div className='nick'>닉네임</div>
          <span className='nickName'>{nickName}님 </span>
          <span className='nickName'>{gender}여</span>
        </div>
      </GuideInfo>
      <GuideContent>{content.length > 60 ? content.slice(0, 60) + '...' : content}</GuideContent>
    </CardLi>
  );
}
