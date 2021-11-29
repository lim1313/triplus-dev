import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';

export default function SignupPw(props) {
  const { value, handleInputChange } = props;
  return (
    <>
      <InputBlock>
        <LoginLabel for='pwInput'>PASSWORD</LoginLabel>
        <LoginInput
          id='pwInput'
          placeholder='비밀번호'
          type='password'
          value={value}
          onChange={handleInputChange}
          name='password'
        />
      </InputBlock>
      <InputBlock>
        <LoginLabel for='pwCheck'>CHECK PASSWORD</LoginLabel>
        <LoginInput id='pwCheck' placeholder='비밀번호 확인' type='password' />
      </InputBlock>
    </>
  );
}
