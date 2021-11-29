import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';

export default function SignupEmail(props) {
  const { value, handleInputChange } = props;
  return (
    <InputBlock>
      <LoginLabel for='emailInput'>EMAIL</LoginLabel>
      <LoginInput
        id='emailInput'
        placeholder='이메일'
        value={value}
        onChange={handleInputChange}
        name='email'
      />
    </InputBlock>
  );
}
