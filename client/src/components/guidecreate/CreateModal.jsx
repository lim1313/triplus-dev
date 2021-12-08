import React, { useState } from 'react';
import { Background, ModalTitle, ModalWrapper } from '../../styles/common/modal';
import { ColorBtn } from '../../styles/common/index';
import styled from 'styled-components';
import GuideTitle from './GuideTitle';
import GuideImgs from './GuideImgs';
import GuideDate from './GuideDate';
import GuidePlace from './GuidePlace';
import GuideTime from './GuideTime';
import GuideContent from './GuideContent';
import { ImCancelCircle } from 'react-icons/im';
import { createGudie } from '../../network/management/http';
import dayjs from 'dayjs';
import GuideGender from './GuideGender';

const { kakao } = window;

const DatePlaceCtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 13rem;
`;
const SubmitCtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
const DeleteBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 1rem;
  right: 0.7rem;
  cursor: pointer;
  & .cancel {
    color: ${({ theme }) => theme.color.gray};
    font-size: 1rem;
  }
`;

export default function CreateModal(props) {
  //props와 state
  const { handleCloseCreate, handleCreateClick } = props;
  const [inputs, setInputs] = useState({
    title: '',
    date: '',
    address: '',
    gender: false,
    startTime: '',
    endTime: '',
    count: '',
    content: '',
    openDate: '',
    latitude: '',
    longitude: '',
  });
  const [fileUrl, setFileUrl] = useState({
    file: null,
    file2: null,
    file3: null,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [fileArray, setFileArray] = useState([]);
  const [isGender, setIsGender] = useState(false);
  const [address, setAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  //이벤트핸들러 함수

  let geocoder = new kakao.maps.services.Geocoder();

  let callback = (result, status) => {
    const data = result[0].road_address;
    setInputs({ ...inputs, latitude: data.x, longitude: data.y });
    if (status === kakao.maps.services.Status.Ok) {
      console.log('Ok');
    }
  };
  const handlePlaceBlur = () => {
    geocoder.addressSearch(address, callback);
  };
  const handleInputChange = (e) => {
    const id = e.target.getAttribute('id');
    if (id === 'address') {
      setInputs({ ...inputs, address: address + ' ' + e.target.value });
      setExtraAddress(e.target.value);
    } else {
      setInputs({ ...inputs, [id]: e.target.value });
    }
  };
  const handleDateChange = (date) => {
    console.log(date);
    setStartDate(date);
    setInputs({ ...inputs, date: dayjs(date).format('YYYY.MM.DD') });
  };

  const handleImgChange = (e) => {
    if (e.target.files) {
      console.log(e.target.files);
      const targetId = e.target.getAttribute('id');
      console.log(targetId);
      const imgFile = e.target.files[0];
      const imgUrl = URL.createObjectURL(imgFile);
      setFileUrl({ ...fileUrl, [targetId]: imgUrl });
      setFileArray([...fileArray, e.target.files[0]]);
    }
    console.log(fileArray);
  };

  const handleSubmitClick = () => {
    console.log(fileArray);
    const formData = new FormData();
    for (let key in inputs) {
      formData.append(key, inputs[key]);
    }
    for (let el of fileArray) {
      formData.append('file', el);
    }
    createGudie(formData).then((res) => console.log(res));
  };

  const handleAddressChange = (data) => {
    setAddress(data);
  };

  const handleGenderClick = () => {
    setIsGender(!isGender);
    setInputs({ ...inputs, gender: !isGender });
    console.log(inputs);
  };
  return (
    <Background onClick={handleCloseCreate} name='Background'>
      <ModalWrapper width='27rem' minWidth='23rem'>
        <DeleteBtn>
          <ImCancelCircle className='cancel' onClick={handleCreateClick} />
        </DeleteBtn>
        <ModalTitle>가이드 카드 만들기</ModalTitle>
        <GuideTitle handleInputChange={handleInputChange} value={inputs.title} />
        <GuideGender handleGenderClick={handleGenderClick} isGender={isGender} />
        <GuideImgs handleImgChange={handleImgChange} fileUrl={fileUrl} />
        <DatePlaceCtn>
          <GuideDate
            setInputs={setInputs}
            inputs={inputs}
            handleDateChange={handleDateChange}
            value={inputs.date}
            startDate={startDate}
          />
          <GuidePlace
            handleInputChange={handleInputChange}
            handleAddressChange={handleAddressChange}
            value={inputs.address}
            address={address}
            extraAddress={extraAddress}
            handlePlaceBlur={handlePlaceBlur}
          />
        </DatePlaceCtn>
        <GuideTime handleInputChange={handleInputChange} value={inputs} />
        <GuideContent handleInputChange={handleInputChange} value={inputs} />
        <SubmitCtn>
          <ColorBtn palette='red' width='8rem' fontSize='1rem' onClick={handleSubmitClick}>
            카드 만들기
          </ColorBtn>
        </SubmitCtn>
      </ModalWrapper>
    </Background>
  );
}
