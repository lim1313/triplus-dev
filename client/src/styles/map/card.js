import styled from 'styled-components';

export const Profile = styled.div`
  background: url(${({ userImg }) => userImg}) no-repeat center;
  background-size: contain;
  background-color: white;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 3px solid ${({ theme }) => theme.color.lightGray};
  border-radius: calc(${({ height }) => height} / 2);
  margin-right: ${({ marginRight }) => marginRight};
  margin: ${({ margin }) => margin};

  @media ${({ theme }) => theme.device.mobile} {
    width: ${({ mWidth }) => mWidth};
    height: ${({ mHeight }) => mHeight};
    border-radius: calc(${({ mHeight }) => mHeight} / 2);
  }
`;

export const CardModalSubTitle = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.color.blue};
  margin: 2.5rem 0 1rem 0;
  /* font-weight: 700; */

  @media ${({ theme }) => theme.device.mobile} {
  }
`;
