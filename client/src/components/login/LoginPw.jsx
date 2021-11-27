import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';

export default function LoginPw() {
  return (
    <InputBlock>
      <LoginLabel for='idInput'>PASSWORD</LoginLabel>
      <LoginInput id='idInput' placeholder='비밀번호' />
    </InputBlock>
  );
}
