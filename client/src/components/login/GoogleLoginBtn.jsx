import React from 'react';
import { ImGoogle3 } from 'react-icons/im';
import { ButtonBlock, OauthBtn } from '../../styles/login/OauthBtn';

export default function GoogleLoginBtn() {
  const handleSignGoogle = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
    );
  };
  return (
    <ButtonBlock>
      <OauthBtn onClick={handleSignGoogle}>
        <ImGoogle3 className='oauth-btn'></ImGoogle3>
      </OauthBtn>
      <span>
        구글
        <br />
        로그인
      </span>
    </ButtonBlock>
  );
}
