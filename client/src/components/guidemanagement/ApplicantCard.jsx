import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common';
import { Profile } from '../../styles/map/card';

const CardCtn = styled.li`
  /* flex: 0 0 auto; */
  flex-shrink: 0;
  width: 32%;
  height: 200px;
  margin: 0 0.4rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: relative;
  padding-bottom: 1rem;
  box-shadow: 0px 0px 9px -1px rgba(46, 46, 46, 0.57);
  transform: translateX(${({ fromLeft }) => fromLeft + 'px'});
`;
const GuideInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserProfile = styled(Profile)`
  margin: 0;
`;
const Nick = styled.div`
  color: ${({ theme }) => theme.color.gray};
  /* font-weight: bold; */
`;
const ChatBtn = styled(ColorBtn)`
  margin-top: 10px;
  position: absolute;
  right: 5px;
  bottom: 10px;
`;

export default function ApplicantCard(props) {
  const { applicantInfo, cardRef } = props;

  return (
    <CardCtn ref={cardRef}>
      <GuideInfo>
        <UserProfile
          userImg={'/asset/logo/logo.png'}
          width='100px'
          height='100px'
          mWidth='70px'
          mHeight='70px'
          marginRight='1rem'
        ></UserProfile>
        <Nick>닉네임: {applicantInfo && applicantInfo.nickname}안뇽안뇽</Nick>
      </GuideInfo>
      <ChatBtn palette='red'>채팅</ChatBtn>
    </CardCtn>
  );
}
