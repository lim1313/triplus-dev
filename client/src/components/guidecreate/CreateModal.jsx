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
  const { handleCloseCreate, handleCreateClick } = props;
  const [inputs, setInputs] = useState({
    title: '',
    date: '',
    region: '',
    startTime: '',
    endTime: '',
    count: '',
    content: '',
    openDate: '',
  });
  const [fileUrl, setFileUrl] = useState({
    file: null,
    file2: null,
    file3: null,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [fileArray, setFileArray] = useState([]);
  const handleInputChange = (e) => {
    const id = e.target.getAttribute('id');
    setInputs({ ...inputs, [id]: e.target.value });
    console.log(inputs);
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
  return (
    <Background onClick={handleCloseCreate} name='Background'>
      <ModalWrapper width='25rem' minWidth='23rem'>
        <DeleteBtn>
          <ImCancelCircle className='cancel' onClick={handleCreateClick} />
        </DeleteBtn>
        <ModalTitle>가이드 카드 만들기</ModalTitle>
        <GuideTitle handleInputChange={handleInputChange} value={inputs.title} />
        <GuideGender />
        <GuideImgs handleImgChange={handleImgChange} fileUrl={fileUrl} />
        <DatePlaceCtn>
          <GuideDate
            setInputs={setInputs}
            inputs={inputs}
            handleDateChange={handleDateChange}
            value={inputs.date}
            startDate={startDate}
          />
          <GuidePlace handleInputChange={handleInputChange} value={inputs.region} />
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
