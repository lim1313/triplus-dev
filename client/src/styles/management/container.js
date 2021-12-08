import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const ManageCtn = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  margin: 0 auto;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
  }
`;
