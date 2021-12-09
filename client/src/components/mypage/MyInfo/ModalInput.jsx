import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../../styles/common';

const Title = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.blue};
  font-weight: 700;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 0.5rem 0 2rem 0;
  justify-content: space-between;

  & input {
    width: 80%;
    height: 2rem;
    &:focus {
      outline: none;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    & input {
      width: 70%;
      font-size: 0.85rem;
    }
  }
`;

const AlertMsg = styled.div`
  position: absolute;
  bottom: -1.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.red};

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.75rem;
  }
`;

export default function ModalInput({
  email,
  onClick,
  title,
  placeText,
  value,
  onChange,
  disabled,
  alertMsg,
}) {
  return (
    <>
      <Title>{title}</Title>
      <InputWrapper>
        <input type='text' placeholder={placeText} value={value} onChange={onChange} />
        {email && (
          <ColorBtn palette='blue' onClick={onClick} disabled={disabled}>
            인증
          </ColorBtn>
        )}
        <AlertMsg>{alertMsg}</AlertMsg>
      </InputWrapper>
    </>
  );
}
