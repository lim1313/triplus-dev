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
  font-size: 3rem;
  cursor: pointer;
  & .oauth-btn {
    border-radius: 50%;
  }
  & :hover {
    color: ${({ theme }) => theme.color.blue};
  }
`;
