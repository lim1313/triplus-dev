import styled from 'styled-components';

export const FilterFrame = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height || '40px'};
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  line-height: 40px;
  background-color: #fff;
  margin: 5px;
  text-align: center;
  color: ${({ color, theme }) => theme.color[color] || 'black'};

  &:hover {
    cursor: pointer;
  }

  @media ${({ theme }) => theme.device.mobile} {
    box-sizing: content-box;
    width: ${({ width }) => `calc(${width} - 10px)`};
    height: 30px;
    line-height: 30px;
    border: 3px solid ${({ theme }) => theme.color.lightGray};
  }
`;
