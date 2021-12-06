import React from 'react';
import styled from 'styled-components';
import { BorderBtn, ColorBtn } from '../../styles/common';

const ProfileWrapper = styled.div`
  margin-right: 2rem;
`;

const ImgWrapper = styled.img`
  position: relative;
  width: 170px;
  height: 220px;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: #fff;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 1.1em;
  margin-bottom: 0.5rem;
`;

const BtnBorder = styled(BorderBtn)`
  padding: 0.1em 1.1em;
`;

export default function MyProfile() {
  return (
    <ProfileWrapper>
      <ImgWrapper src='/asset/logo/logo.png' alt='프로필' />
      <BtnWrapper>
        <BtnColor palette='blue'>업로드</BtnColor>
        <BtnBorder>삭제</BtnBorder>
      </BtnWrapper>
    </ProfileWrapper>
  );
}
