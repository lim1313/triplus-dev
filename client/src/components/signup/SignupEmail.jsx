import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';
import styled from 'styled-components';

const CheckMessage = styled.span`
  color: ${({ emailMessage, theme }) =>
    emailMessage === '사용이 가능한 이메일입니다' ? '#08A600' : theme.color.red};
  font-size: 0.8rem;
`;

export default function SignupEmail(props) {
  const { value, handleInputChange, emailMessage, handleEmailBlur } = props;
  return (
    <InputBlock>
      <LoginLabel htmlFor='emailInput'>EMAIL</LoginLabel>
      <LoginInput
        id='emailInput'
        placeholder='이메일'
        value={value}
        onChange={handleInputChange}
        onBlur={handleEmailBlur}
        name='email'
        emailMessage={emailMessage}
      />
      <CheckMessage emailMessage={emailMessage}>{emailMessage}</CheckMessage>
    </InputBlock>
  );
}
