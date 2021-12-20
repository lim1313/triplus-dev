import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.li`
  display: inline-block;
  height: 220px;
  width: 220px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 5px;

  /* background-color: ${({ backImage }) => (backImage ? '#fff' : 'rgba(246, 247, 250, 1)')}; */
  background-color: rgba(246, 247, 250, 1);
  background-image: url(${({ backImage }) => backImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export default function GuideImg({ img }) {
  return <ImageWrapper backImage={img} />;
}
