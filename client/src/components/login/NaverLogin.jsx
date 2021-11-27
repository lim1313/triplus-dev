import React from 'react';
import { SiNaver } from 'react-icons/si';
import { ButtonBlock, OauthBtn } from '../../styles/login/OauthBtn';

export default function KakaoLogin() {
  return (
    <ButtonBlock>
      <OauthBtn>
        <SiNaver className='oauth-btn' />
      </OauthBtn>
      <span>
        네이버
        <br />
        로그인
      </span>
    </ButtonBlock>
  );
}
