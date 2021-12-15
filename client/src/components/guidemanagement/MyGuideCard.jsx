import React from 'react';
import styled from 'styled-components';
import { NoBorderBtn } from '../../styles/common';
import { useDispatch } from 'react-redux';
import { guideDelete } from '../../redux/management/action';

const CardCtn = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: center;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    /* flex-direction: column; */
  }
`;
const CardWrapper = styled.div`
  width: 90%;
  border-radius: 8px;
  box-shadow: 0px 0px 9px -1px rgba(46, 46, 46, 0.57);
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  } */
`;
const GuideImg = styled.div`
  width: 150px;
  height: 150px;
  background: url(${({ guideInfo }) => guideInfo.tourImage[0]}) no-repeat center;
  background-size: cover;
  border: 3px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 75%;
  flex-shrink: 0;
  @media ${({ theme }) => theme.device.mobile} {
    position: absolute;
    border-radius: 0;
    border: none;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    top: 0;
    width: 90%;
    background-size: cover;
    height: 80px;
    filter: opacity(80%);
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    position: absolute;
    top: 20%;
    left: 8%;
    & h1 {
      text-shadow: 1px 1px 1px #fff;
      width: 20rem;
      font-size: 1.2rem;
    }
    & p {
      margin-top: 0;
      width: 300px;
    }
  }
  @media screen and (max-width: 350px) {
    & h1 {
      font-size: 1.2rem;
    }
    & span {
      width: 16rem;
    }
  }
`;
const Count = styled.div`
  text-align: center;
  flex-shrink: 0;
  & h5 {
    margin: 0 0 0.5rem 0;
  }

  @media ${({ theme }) => theme.device.mobile} {
    position: absolute;
    left: 8%;
    top: 80%;
    & h5 {
      font-size: 1rem;
      display: inline;
    }
  }
`;

const BtnCtn = styled.div`
  flex: none;

  @media ${({ theme }) => theme.device.mobile} {
    position: absolute;
    right: 5%;
    top: 78%;
  }
`;

export default function MyGuideCard(props) {
  const { guideInfo, applicantInfo } = props;
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(guideDelete());
  };
  console.log('guideCard', applicantInfo);

  return (
    <CardCtn>
      <CardWrapper>
        {guideInfo.title ? (
          <>
            <GuideImg guideInfo={guideInfo} />
            <GuideInfo>
              <h1>{guideInfo && guideInfo.title}</h1>
              <span>날짜: {guideInfo && guideInfo.guideDate}</span>
              <p>대표장소: {guideInfo && guideInfo.address}</p>
            </GuideInfo>
            <Count>
              <h5>
                신청인원<span className='colon'>:&nbsp;</span>
              </h5>
              {applicantInfo.length === 0 ? 0 : applicantInfo.length}/{guideInfo && guideInfo.count}
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
