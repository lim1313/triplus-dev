import React from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/management/guideCreate';

const TitleInput = styled(Input)`
  width: 100%;
  margin: 1.5rem 0 1rem 0;
`;

export default function GuideTitle(props) {
  const { handleInputChange, value } = props;
  return (
    <TitleInput
      placeholder='제목'
      onChange={handleInputChange}
      value={value}
      id='title'
    ></TitleInput>
  );
}
