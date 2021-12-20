import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';

export default function LoginPw(props) {
  const { userPw, handlePwChange } = props;
  return (
    <InputBlock>
      <LoginLabel htmlFor='pwInput'>PASSWORD</LoginLabel>
      <LoginInput
        id='pwInput'
        placeholder='비밀번호'
        type='password'
        value={userPw}
        onChange={handlePwChange}
        autoComplete='off'
      />
    </InputBlock>
  );
}
