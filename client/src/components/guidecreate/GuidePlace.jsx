import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/management/guideCreate';
import DaumPostcode from 'react-daum-postcode';

const InputCtn = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
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
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [address, setAddress] = useState('');

  const openPostCode = () => {
    console.log('open');
    setPopupOpen(true);
  };
  const closePostCode = () => {
    console.log('close');
    setPopupOpen(false);
  };

  const onCompletePost = (data) => {
    setAddress(data.address);
  };

  const postCodeStyle = {
    position: 'absolute',
  };

  return (
    <InputCtn>
      <div id='popupDom'>
        {isPopupOpen && (
          <DaumPostcode onClick={closePostCode} onComplete={onCompletePost} style={postCodeStyle} />
        )}
      </div>
      <lable htmlFor='place'>장소입력</lable>
      <PlaceInput id='place' placeholder='도로명주소' onClick={openPostCode} value={address} />
      <PlaceInput placeholder='상세주소' />
    </InputCtn>
  );
}
