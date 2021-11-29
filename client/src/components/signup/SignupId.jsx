import React, { useState } from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';
import { checkId } from '../../network/signup/http';

export default function SignupId(props) {
  const { handleInputChange, value } = props;
  const { message, setMessage } = useState;
  const handleBlur = () => {
    checkId({ userId: value }).then((res) => setMessage(res.message));
  };
  return (
    <InputBlock>
      <LoginLabel for='idInput'>ID</LoginLabel>
      <LoginInput
        id='idInput'
        placeholder='아이디'
        onChange={handleInputChange}
        value={value}
        name='userId'
        onBlur={handleBlur}
      />
      <span>{message}</span>
    </InputBlock>
  );
}
