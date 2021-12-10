import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  margin: 1rem 0 1.3rem 0;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.blue};
`;

const InputPw = styled.input`
  &:focus {
    outline: none;
  }
`;

const AlertMsg = styled.div`
  position: absolute;
  bottom: -1.4rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.red};

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.75rem;
  }
`;
export default function PwInput({ subTitle, pwNum, onChange, alertMsg, onBlur }) {
  return (
    <InputWrapper>
      <SubTitle>{subTitle}</SubTitle>
      <InputPw
        type='password'
        placeholder={subTitle}
        value={pwNum}
        onChange={onChange}
        onBlur={onBlur}
        autofocus
      ></InputPw>
      <AlertMsg>{alertMsg}</AlertMsg>
    </InputWrapper>
  );
}
