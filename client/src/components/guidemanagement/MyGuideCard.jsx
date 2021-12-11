import React from 'react';
import styled from 'styled-components';
import { NoBorderBtn } from '../../styles/common';
import { useDispatch } from 'react-redux';
import { guideDelete } from '../../redux/management/action';

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
  background: url(${({ guideInfo }) => guideInfo.guideImage}) no-repeat center;
  background-size: contain;
  border: 3px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 75%;
  flex-shrink: 0;
`;
const GuideInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.darkGray};
  & h1 {
    margin-top: 0;
  }
  & span {
    font-size: 1rem;
  }
`;
const Count = styled.div`
  text-align: center;
  & h5 {
    margin: 0 0 0.5rem 0;
  }
  flex-shrink: 0;
`;

const BtnCtn = styled.div`
  flex: none;
`;

export default function MyGuideCard(props) {
  const { guideInfo, applicantInfo } = props;
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(guideDelete());
  };
  return (
    <CardCtn>
      <CardWrapper>
        {guideInfo.title ? (
          <>
            <GuideImg guideInfo={guideInfo} />
            <GuideInfo>
              <h1>{guideInfo && guideInfo.title}</h1>
              <span>날짜: {guideInfo && guideInfo.guideDate}</span>
              <span>대표장소: {guideInfo && guideInfo.address} 경복궁체험</span>
            </GuideInfo>
            <Count>
              <h5>신청인원</h5>
              {applicantInfo.length === 0 ? 0 : applicantInfo.length}/
              {guideInfo && guideInfo.numPeople}5
            </Count>
            <BtnCtn>
              <NoBorderBtn palette='red' onClick={handleDeleteClick}>
                취소
              </NoBorderBtn>
            </BtnCtn>
          </>
        ) : (
          <div>진행중인 가이드가 없습니다</div>
        )}
      </CardWrapper>
    </CardCtn>
  );
}
