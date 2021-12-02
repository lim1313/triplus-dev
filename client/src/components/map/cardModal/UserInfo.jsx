import React from 'react';
import styled from 'styled-components';
import { Profile } from '../../../styles/map/card';
import { FaFemale, FaMale } from 'react-icons/fa';

const User = styled.div`
  margin: 1rem;
  text-align: center;

  & .nick {
    color: ${({ theme }) => theme.color.gray};
  }

  & .userNick {
    font-size: 1.2rem;
  }
  & .gender {
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 0.7rem;
    margin-left: 0.5rem;
    color: #fff;
    background-color: ${({ theme, gender }) => (gender ? theme.color.red : theme.color.blue)};
  }
`;

export default function UserInfo({ userImage, nickName, gender }) {
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
      <User gender={gender}>
        <div>
          <span className='nick'>가이드 닉네임</span>
          <span className='gender'>{gender ? <FaFemale /> : <FaMale />}</span>
        </div>
        <div className='userNick'>신나는 여행자님</div>
        {/* <div className='userNick'>{nickName}</div> */}
      </User>
    </>
  );
}
