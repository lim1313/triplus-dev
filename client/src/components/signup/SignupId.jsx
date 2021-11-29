import React, { useState } from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';
import { checkId } from '../../network/signup/http';
import { idValidation } from '../../utils/validation';
import styled from 'styled-components';

const CheckMessage = styled.span`
  color: ${({ props, theme }) =>
    props === '사용이 가능한 아이디입니다.' ? '#08A600' : theme.color.red};
`;

export default function SignupId(props) {
  const { handleInputChange, value } = props;
  const [message, setMessage] = useState('');
  const handleBlur = () => {
    if (!idValidation(value)) {
      setMessage('4~12자리의 영문, 숫자만 가능합니다.');
    } else {
      checkId(value).then((res) => {
        setMessage(res.data.message);
      });
    }
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
      <CheckMessage props={message}>{message}</CheckMessage>
    </InputBlock>
  );
}
