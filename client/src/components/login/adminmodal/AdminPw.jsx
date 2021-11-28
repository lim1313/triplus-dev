import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../../styles/login/LoginInput';

export default function AdminPw(props) {
  const { adminPw, handlePwChange } = props;
  return (
    <InputBlock>
      <LoginLabel for='pwInput'>PASSWORD</LoginLabel>
      <LoginInput
        id='pwInput'
        placeholder='비밀번호'
        onChange={handlePwChange}
        value={adminPw}
        type='password'
      />
    </InputBlock>
  );
}
