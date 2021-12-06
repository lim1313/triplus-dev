import React from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/management/guideCreate';

const InputCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 100%;
  & label {
    font-size: 0.6rem;
  }
`;
const PlaceInput = styled(Input)`
  margin-bottom: 0.2rem;
  width: 100%;

  &::placeholder {
    font-size: 1.1rem;
  }
`;

export default function GuidePlace() {
  return (
    <InputCtn>
      <lable htmlFor='place'>장소입력</lable>
      <PlaceInput id='place' placeholder='도로명주소' />
      <PlaceInput placeholder='상세주소' />
    </InputCtn>
  );
}
