import React from 'react';
import styled from 'styled-components';
import { ColorBtn, BorderBtn } from '../../styles/common';
import { UserInfo } from './MyInfoFrame';

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

const BtnWrapper = styled.div`
  display: flex;
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 1.1em;
  flex-grow: 1;
`;

const BtnBorder = styled(BorderBtn)`
  padding: 0.1em 1.1em;
  flex-grow: 1;
`;

export default function MyInfo({ userInfo }) {
  const { userId, email, nickName, reigion } = userInfo;

  return (
    <Wrapper>
      <NameWrapper>
        <UserInfo user title='user' content={userId} noBtn />
        {/* 8글자로 제한  */}
        <UserInfo user title='nickname' content={nickName} />
      </NameWrapper>
      <UserInfo title='e-mail' content={email} />
      <UserInfo title='address' content={reigion} />
      <BtnWrapper>
        <BtnColor>비밀번호 수정</BtnColor>
        <BtnBorder>회원탈퇴</BtnBorder>
      </BtnWrapper>
    </Wrapper>
  );
}
