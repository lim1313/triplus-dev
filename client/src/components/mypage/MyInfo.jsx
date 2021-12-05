import React from 'react';
import styled from 'styled-components';
import { ColorBtn, BorderBtn } from '../../styles/common';
import { UserInfo } from '../../styles/myPage/myInfoFrame';

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

export default function MyInfo() {
  return (
    <Wrapper>
      <NameWrapper>
        <UserInfo title='name' content='트리플' marginRight='1.5rem' />
        <UserInfo title='nickname' content='트리플' />
      </NameWrapper>
      <UserInfo title='e-mail' content='gogogo@gmail.com' />
      <UserInfo title='address' content='서울특별시 강남구 소초동 15-1' />
      <BtnWrapper>
        <BtnColor>비밀번호 수정</BtnColor>
        <BtnBorder>회원탈퇴</BtnBorder>
      </BtnWrapper>
    </Wrapper>
  );
}
