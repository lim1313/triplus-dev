/*eslint-disable no-unused-vars*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useError } from '../../../hooks/useError';
import { useInput } from '../../../hooks/useInput';
import { putPassword } from '../../../network/my/http';
import { exit } from '../../../redux/login/action';
import { ModalTitle } from '../../../styles/common/modal';
import { pwValidaton } from '../../../utils/validation';
import Modal, { BtnWrapper, SelectBtn } from '../../common/Modal';
import PwInput from './PwInput';

const BtnSelect = styled(SelectBtn)`
  color: #fff;
  background: ${({ theme }) => theme.color.red};
  border: 1px solid ${({ theme }) => theme.color.red};

  &:hover {
    background: none;
    border: 1px solid ${({ theme }) => theme.color.red};
    color: ${({ theme }) => theme.color.red};
  }
`;
export default function PwModal({ closeModal }) {
  const [currentPw, currentChange] = useInput('');
  const [newPw, newChange] = useInput('');
  const [checkPw, checkChange] = useInput('');
  const [alertMsg1, setAlertMsg1] = useState(null);
  const [alertMsg2, setAlertMsg2] = useState(null);

  const [isError] = useError();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitPw = () => {
    if (!currentPw || !newPw || !checkPw) {
      setAlertMsg2('*모든 입력창을 기입해 주세요');
    } else if (!pwValidaton(newPw)) {
      setAlertMsg2('*8~16자, 최소 하나의 숫자와 특수문자가 필요합니다');
    } else if (newPw !== checkPw) {
      setAlertMsg2('*새로운 비밀번호와 일치하지 않습니다');
    } else {
      setAlertMsg2(null);
      //TODO 새로운 비밀번호 갱신
      putPassword({ oldPassword: currentPw, password: newPw }).then((res) => {
        if (res === 401) return isError();
        else if (res === 201) {
          // 201 성공적으로 수행
          navigate('/login', {
            state: { logout: '비밀번호가 변경되어, 로그아웃되었습니다' },
            replace: true,
          });
          //! 수정 필요 => accessToken을 null로 변경하지 않음.
          dispatch(exit());
        } else if (res === 400) {
          // 현재 비밀번호를 잘못 작성
          setAlertMsg1('*현재 비밀번호가 일치하지 않습니다');
        } else {
          alert('에러가 발생했습니다. 다시 시도해 주세요.');
        }
      });
    }
  };

  const sameCheckPw = () => {
    if (newPw !== checkPw) {
      setAlertMsg1(null);
      setAlertMsg2('*새로운 비밀번호와 일치하지 않습니다');
    } else {
      setAlertMsg1(null);
      setAlertMsg2(null);
    }
  };

  return (
    <Modal width='auto'>
      <ModalTitle fontSize='1.1rem'>비밀번호 변경</ModalTitle>
      <PwInput
        subTitle='현재 비밀번호'
        pwNum={currentPw}
        onChange={currentChange}
        alertMsg={alertMsg1}
      />
      <PwInput subTitle='새 비밀번호' pwNum={newPw} onChange={newChange} />
      <PwInput
        subTitle='비밀번호 확인'
        pwNum={checkPw}
        onChange={checkChange}
        alertMsg={alertMsg2}
        onBlur={sameCheckPw}
      />
      <BtnWrapper>
        <BtnSelect onClick={submitPw}>수정</BtnSelect>
        <SelectBtn onClick={closeModal}>취소</SelectBtn>
      </BtnWrapper>
    </Modal>
  );
}
