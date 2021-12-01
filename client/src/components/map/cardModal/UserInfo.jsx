import React from 'react';
import styled from 'styled-components';
import { Profile } from '../../../styles/map/card';

const User = styled.div`
  margin: 1rem;
  text-align: center;

  & .userNick {
    font-size: 1.5rem;
  }
  & .gender {
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    background-color: ${({ theme }) => theme.color.red};
  }
`;

export default function UserInfo({ userImage, nickName, gender, guideDate }) {
  return (
    <>
      <Profile
        userImg={userImage}
        width='150px'
        height='150px'
        margin='0 auto'
        mWidth='130px'
        mHeight='130px'
      />
      <User>
        <div>닉네임</div>
        <div className='userNick'>
          {/* <span>{nickName}</span>
          <span>{gender}</span> */}
          <div>나의닉네임나네임임</div>
          <span className='gender'>1</span>
        </div>
      </User>
    </>
  );
}
