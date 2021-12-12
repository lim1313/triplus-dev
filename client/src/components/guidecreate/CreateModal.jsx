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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loading from '../common/Loading';
import { exit } from '../../redux/login/action';
import AlertMsgModal from './AlertMsgModal';

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
  @media ${({ theme }) => theme.device.mobile} {
    top: 1.4rem;
    right: 0;
    & .cancel {
      color: ${({ theme }) => theme.color.gray};
      font-size: 1.2rem;
    }
  }
`;

const CreateModalWrapper = styled(ModalWrapper)`
  height: 95vh;
  overflow-y: auto;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 1.5rem;
  }
`;

const CompleteMessage = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.color.blue};
  position: absolute;
  left: 30%;
  top: 30%;
`;

export default function CreateModal(props) {
  //props와 state
  const { handleCloseCreate, handleCreateClick } = props;
  const [isLoading, setIsLoading] = useState(false);
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [unCompleteMsgOpen, setUnCompleteMsgOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //이벤트핸들러 함수

  //주소->좌표 변경함수
  const geocoder = new kakao.maps.services.Geocoder();
  const callback = (result, status) => {
    const data = result[0].road_address;
    setInputs({ ...inputs, latitude: data.y, longitude: data.x });
    if (status === kakao.maps.services.Status.Ok) {
      console.log('Ok');
    }
  };

  //상세주소 입력시점 + 주소->좌표 변경시점
  const handlePlaceBlur = () => {
    if (address) {
      geocoder.addressSearch(address, callback);
    } else return;
  };

  // input상태관리 함수
  const handleInputChange = (e) => {
    const id = e.target.getAttribute('id');
    if (id === 'title' && e.target.value.length > 20) return;
    if (id === 'address') {
      setInputs({ ...inputs, address: address + ' ' + e.target.value });
      setExtraAddress(e.target.value);
    } else {
      setInputs({ ...inputs, [id]: e.target.value });
    }
  };

  //date input 상태관리 함수
  const handleDateChange = (date) => {
    console.log(date);
    setStartDate(date);
    setInputs({ ...inputs, date: dayjs(date).format('YYYY.MM.DD') });
  };

  //img input 상태관리 함수+미리보기 구현
  const handleImgChange = (e) => {
    if (!e.target.files[0]) return;
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

  //도로명주소 저장 함수
  const handleAddressChange = (data) => {
    setAddress(data);
  };

  // 성별 토글 상태관리 함수
  const handleGenderClick = () => {
    setIsGender(!isGender);
    setInputs({ ...inputs, gender: !isGender });
    console.log(inputs);
  };

  const inputCheck = (checkData) => {
    for (let key in checkData) {
      if (key === 'gender') continue;
      if (key === 'openDate') continue;
      if (!checkData[key]) return false;
    }
    return true;
  };

  //가이드 생성 버튼 클릭시 이벤트 핸들러 함수
  const handleSubmitClick = () => {
    if (inputCheck(inputs)) {
      setIsLoading(true);
      console.log(fileArray);
      const formData = new FormData();
      for (let key in inputs) {
        formData.append(key, inputs[key]);
      }
      for (let el of fileArray) {
        formData.append('file', el);
      }
      createGudie(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // setIsLoading(false);
            setIsCompleted(true);
            navigate('/management');
          }
        })
        .catch((error) => {
          setIsLoading(false);
          dispatch(exit());
          navigate('/login');
        });
    } else {
      setTimeout(() => setUnCompleteMsgOpen(true), 0);
      setTimeout(() => setUnCompleteMsgOpen(false), 1000);
    }
  };

  return (
    <Background onClick={handleCloseCreate} name='Background'>
      {unCompleteMsgOpen ? <AlertMsgModal /> : null}
      <CreateModalWrapper width='26rem' minWidth='23rem'>
        <DeleteBtn>
          <ImCancelCircle className='cancel' onClick={handleCreateClick} />
        </DeleteBtn>
        {isLoading ? (
          <>
            {isCompleted ? (
              <CompleteMessage>
                업로드가 완료되었습니다!
                <br />
              </CompleteMessage>
            ) : (
              <>
                <LoadingMessage>업로드중입니다...</LoadingMessage>
                <Loading />
              </>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </CreateModalWrapper>
    </Background>
  );
}
