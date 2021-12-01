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
