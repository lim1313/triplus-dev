import React from 'react';
import styled from 'styled-components';
import { Background, ModalWrapper } from '../../../styles/common/modal';
import GuideContent from '../../map/cardModal/GuideContent';
import GuideImgs from '../../map/cardModal/GuideImgs';
import Userinfo from '../../map/cardModal/UserInfo';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { openTourModal } from '../../../redux/tourManagement/action';
import { ColorBtn } from '../../../styles/common/index';

const TourModalWrapper = styled(ModalWrapper)`
  height: ${({ allow }) => (allow === 'CANCELED' ? '30vh' : '90vh')};
  overflow: auto;
  width: 27rem;

  .alert-message {
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.color.red};
    font-size: 0.8rem;
  }
`;
const TourTitle = styled.h1`
  margin: 0;
  padding: 1rem 0;
  font-size: 1.7rem;
  text-align: center;
  color: ${({ theme }) => theme.color.darkGray};
  word-break: keep-all;
`;

const BtnWrapper = styled.div`
  text-align: right;
  position: sticky;
  top: 0;
  right: 0;
  z-index: 4;
`;
const CloseBtn = styled.button`
  border: none;
  background-color: unset;
  padding: 0.5rem;
  font-size: 1.2rem;
  opacity: 0.5;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const CancelBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
const CancelBtn = styled(ColorBtn)`
  width: 10rem;
`;
const NoticeMsg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MsgWapper = styled.div`
  text-align: center;
`;

export default function TourModal({ modalInfo }) {
  const {
    title,
    address,
    gender,
    guideDate,
    tourImage,
    userImage,
    nickName,
    openDate,
    content,
    state,
  } = modalInfo;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(openTourModal({ isOpen: false }));
  };
  const closeModalNotBtn = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(openTourModal({ isOpen: false }));
    }
  };
  return (
    <Background onClick={closeModalNotBtn}>
      <TourModalWrapper allow={state}>
        {state === 'CANCELED' ? (
          <>
            <BtnWrapper onClick={closeModal}>
              <CloseBtn>
                <FaTimes />
              </CloseBtn>
            </BtnWrapper>
            <NoticeMsg>
              <MsgWapper>
                가이드에 의해 삭제된 여행입니다. <br />
                여행목록에서 삭제하시려면 <br />
                하단의 취소하기를 눌러주세요
              </MsgWapper>
              <CancelBtnWrapper>
                <CancelBtn palette='red'>취소하기</CancelBtn>
              </CancelBtnWrapper>
            </NoticeMsg>
          </>
        ) : (
          <>
            <BtnWrapper onClick={closeModal}>
              <CloseBtn>
                <FaTimes />
              </CloseBtn>
            </BtnWrapper>
            <TourTitle>{title}</TourTitle>
            <Userinfo nickName={nickName} gender={gender} userImage={userImage} />
            <GuideImgs tourImage={tourImage} title={title} />
            <GuideContent
              address={address}
              guideDate={guideDate}
              content={content}
              openDate={openDate}
            />
            <div className='alert-message'>*여행 하루전에는 취소가 불가능합니다.</div>
            <CancelBtnWrapper>
              <CancelBtn palette='red'>취소하기</CancelBtn>
            </CancelBtnWrapper>
          </>
        )}
      </TourModalWrapper>
    </Background>
  );
}
