import styled from 'styled-components';

export const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  & span {
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.color.gray};
    text-align: center;
    font-size: 0.7rem;
  }
`;
export const OauthBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  color: ${({ theme }) => theme.color.gray};
  & .oauth-btn {
    border-radius: 50%;
  }
`;
