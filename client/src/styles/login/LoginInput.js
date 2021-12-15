import styled from 'styled-components';

export const InputBlock = styled.div`
  max-width: 100%;
  height: 12vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const LoginLabel = styled.label`
  /* margin-top: 1.5rem; */
`;

export const LoginInput = styled.input`
  height: 4vh;
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  outline: none;
  margin-top: 0.5rem;
  &::-webkit-input-placeholder {
    font-size: 1rem;
  }
`;
