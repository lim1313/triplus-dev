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
  const [inputs, setInputs] = useState({
    title: '',
    date: '',
    region: '',
    startTime: '',
    endTime: '',
    count: '',
    content: '',
    reOpen: 'true',
  });
  // const handleInputChange = () => {};
  const { handleCloseCreate } = props;
  return (
    <Background onClick={handleCloseCreate} name='Background'>
      <ModalWrapper width='25rem' minWidth='23rem'>
        <DeleteBtn>
          <ImCancelCircle className='cancel' onClick={handleCloseCreate} />
        </DeleteBtn>
        <ModalTitle>가이드 카드 만들기</ModalTitle>
        <GuideTitle />
        <GuideImgs />
        <DatePlaceCtn>
          <GuideDate setInputs={setInputs} inputs={inputs} />
          <GuidePlace />
        </DatePlaceCtn>
        <GuideTime />
        <GuideContent />
        <SubmitCtn>
          <ColorBtn palette='red' width='8rem' fontSize='1rem'>
            카드 만들기
          </ColorBtn>
        </SubmitCtn>
      </ModalWrapper>
    </Background>
  );
}
