import React from 'react';
import styled from 'styled-components';
import Password from './MyInfo/Password';
import { UserInfo } from './MyInfo/UserInfo';
import Withdraw from './MyInfo/Withdraw';

const Wrapper = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const NameWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const BtnsWrapper = styled.div`
  display: flex;
`;

export default function MyInfo({ userInfo }) {
  const { userId, email, nickName, region } = userInfo;

  return (
    <Wrapper>
      <NameWrapper>
        <UserInfo user title='user' content={userId} noBtn />
        <UserInfo user title='nickname' content={nickName} />
      </NameWrapper>
      <UserInfo title='e-mail' content={email} />
      <UserInfo title='address' content={region} />
      <BtnsWrapper>
        <Password />
        <Withdraw />
      </BtnsWrapper>
    </Wrapper>
  );
}
