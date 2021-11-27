import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';

export default function LoginId() {
  return (
    <InputBlock>
      <LoginLabel for='idInput'>ID</LoginLabel>
      <LoginInput id='idInput' placeholder='아이디' />
    </InputBlock>
  );
}
