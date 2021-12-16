import React from 'react';
import { Profile, UserNick } from '../../../styles/map/card';

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
      <UserNick gender={gender} nickName={nickName} />
    </>
  );
}
