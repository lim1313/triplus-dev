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
    font-size: 1rem;
  }
  & .popup {
    position: absolute;
    left: -50%;
  }
  @media screen and (max-width: 400px) {
    margin-left: 1rem;
    & .popup {
      position: absolute;
      left: -100%;
    }
  }
`;
const PlaceInput = styled(Input)`
  margin-bottom: 0.2rem;
  width: 100%;

  &::placeholder {
    font-size: 1.1rem;
  }
`;

export default function GuidePlace(props) {
  const { handleInputChange, handleAddressChange, address, extraAddress, handlePlaceBlur } = props;
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPostCode = () => {
    console.log('open');
    setPopupOpen(!isPopupOpen);
  };

  const onCompletePost = (data) => {
    setPopupOpen(false);
    handleAddressChange(data.address);
  };

  const postCodeStyle = {
    position: 'absolute',
    height: '300px',
  };

  return (
    <InputCtn>
      {isPopupOpen === true ? (
        <div id='popupDom' className='popup'>
          <DaumPostcode onComplete={onCompletePost} style={postCodeStyle} />
        </div>
      ) : null}
      <label htmlFor='place'>장소입력</label>
      <PlaceInput
        autoComplete='off'
        placeholder='도로명주소'
        onClick={openPostCode}
        value={address}
      />
      <PlaceInput
        placeholder='상세주소'
        onChange={handleInputChange}
        onBlur={handlePlaceBlur}
        value={extraAddress}
        id='address'
      />
    </InputCtn>
  );
}
