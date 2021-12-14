import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.li`
  display: inline-block;
  height: 220px;
  width: 220px;
  flex-shrink: 0;
  flex-grow: 0;

  background-image: url(${({ backImage }) => backImage});
  background-repeat: no-repeat;
  background-size: contain;
`;

export default function GuideImg({ img }) {
  return <ImageWrapper backImage={img} />;
}
