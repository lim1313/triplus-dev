import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';
import styled from 'styled-components';

const CheckMessage = styled.span`
  color: ${({ theme }) => theme.color.red};
`;

export default function SignupEmail(props) {
  const { value, handleInputChange, emailMessage, handleEmailBlur } = props;
  return (
    <InputBlock>
      <LoginLabel for='emailInput'>EMAIL</LoginLabel>
      <LoginInput
        id='emailInput'
        placeholder='이메일'
        value={value}
        onChange={handleInputChange}
        onBlur={handleEmailBlur}
        name='email'
        emailMessage={emailMessage}
      />
      <CheckMessage>{emailMessage}</CheckMessage>
    </InputBlock>
  );
}
