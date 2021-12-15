import React from 'react';
import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { ButtonBlock, OauthBtn } from '../../styles/login/OauthBtn';

const KakaoBtn = styled(OauthBtn)`
  background-color: #ffea00;
  color: #391b20;
  font-size: 2.1rem;
`;

export default function KakaoLogin() {
  const kakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_HTTPSURL}/oauth/kakao`;
  };

  return (
    <ButtonBlock>
      <KakaoBtn onClick={kakaoLogin}>
        <RiKakaoTalkFill className='oauth-btn' />
      </KakaoBtn>
      <span>
        카카오
        <br />
        로그인
      </span>
    </ButtonBlock>
  );
}
