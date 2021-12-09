import styled from 'styled-components';

export const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  & span {
    text-align: center;
  }
`;
export const OauthBtn = styled.button`
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  height: 3.5rem;
  width: 3.5rem;
  color: ${({ theme }) => theme.color.gray};
  & .oauth-btn {
    border-radius: 50%;
  }
`;
