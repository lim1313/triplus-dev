import React from 'react';
import { ImGoogle3 } from 'react-icons/im';
import { ButtonBlock, OauthBtn } from '../../styles/login/OauthBtn';

export default function GoogleLogin() {
  return (
    <ButtonBlock>
      <OauthBtn>
        <ImGoogle3 className='oauth-btn' />
      </OauthBtn>
      <span>
        구글
        <br />
        로그인
      </span>
    </ButtonBlock>
  );
}
