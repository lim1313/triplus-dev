import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${({ theme }) => theme.color.inputColor};
  border: none;
  outline: none;
  height: 2rem;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray};
    font-size: 1.2rem;
    line-height: 1.2rem;
  }
`;
