import React from 'react';
import { SiKakaotalk } from 'react-icons/si';
import { ButtonBlock, OauthBtn } from '../../styles/login/OauthBtn';

export default function KakaoLogin() {
  return (
    <ButtonBlock>
      <OauthBtn>
        <SiKakaotalk className='oauth-btn' />
      </OauthBtn>
      <span>
        카카오
        <br />
        로그인
      </span>
    </ButtonBlock>
  );
}
