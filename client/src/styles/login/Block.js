import styled from 'styled-components';

export const HeaderBlock = styled.div`
  max-width: 100%;
  min-width: 19rem;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 12rem;
    @media ${({ theme }) => theme.device.mobile} {
      width: 10rem;
    }
  }
`;
