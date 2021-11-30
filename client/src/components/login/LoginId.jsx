import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';

export default function LoginId(props) {
  const { userId, handleIdChange } = props;
  return (
    <InputBlock>
      <LoginLabel htmlFor='idInput'>ID</LoginLabel>
      <LoginInput id='idInput' placeholder='아이디' onChange={handleIdChange} value={userId} />
    </InputBlock>
  );
}
