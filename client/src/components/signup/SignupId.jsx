import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';
import styled from 'styled-components';

const CheckMessage = styled.span`
  font-size: 0.8rem;
  color: ${({ message, theme }) =>
    message === '사용이 가능한 아이디입니다' ? '#08A600' : theme.color.red};
`;

export default function SignupId(props) {
  const { handleInputChange, value, handleIdBlur, message } = props;
  return (
    <InputBlock>
      <LoginLabel htmlFor='idInput'>ID</LoginLabel>
      <LoginInput
        id='idInput'
        placeholder='아이디'
        onChange={handleInputChange}
        value={value}
        name='userId'
        onBlur={handleIdBlur}
      />
      <CheckMessage message={message}>{message}</CheckMessage>
    </InputBlock>
  );
}
