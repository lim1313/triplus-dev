import React from 'react';
import styled from 'styled-components';
import { NoBorderBtn } from '../../styles/common';

const CardCtn = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
`;
const CardWrapper = styled.div`
  width: 90%;
  border-radius: 8px;
  box-shadow: 0px 0px 9px -1px rgba(46, 46, 46, 0.57);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const GuideImg = styled.div`
  width: 150px;
  height: 150px;
  background: url('/asset/logo/logo.png') no-repeat center;
  background-size: contain;
  border: 3px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 75%;
`;
const GuideInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.darkGray};
  & h1 {
  }
  & span {
    font-size: 1rem;
  }
`;
const Count = styled.div``;

const BtnCtn = styled.div``;

export default function MyGuideCard(props) {
  const { guideInfo } = props;
  return (
    <CardCtn>
      <CardWrapper>
        <GuideImg />
        <GuideInfo>
          <h1>{guideInfo && guideInfo.title}</h1>
          <span>날짜: {guideInfo && guideInfo.guideDate}</span>
          <span>대표장소: {guideInfo && guideInfo.address} 경복궁체험</span>
        </GuideInfo>
        <Count>3/{guideInfo && guideInfo.numPeople}5</Count>
        <BtnCtn>
          <NoBorderBtn palette='red'>수정</NoBorderBtn>
          <NoBorderBtn palette='red'>삭제</NoBorderBtn>
        </BtnCtn>
      </CardWrapper>
    </CardCtn>
  );
}
