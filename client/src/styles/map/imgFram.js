import React from 'react';
import styled from 'styled-components';

export const ImgWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};

  & .innerImg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ width }) => width};
    transform: translate(-50%, -50%);
  }
`;

export default function ImgFrame({ width, height, border, borderRadius, children }) {
  return <ImgWrap width={width} height={height} border={border} borderRadius={borderRadius} />;
}
