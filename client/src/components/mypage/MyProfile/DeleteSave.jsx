import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BorderBtn } from '../../../styles/common';
import Modal from '../../common/Modal';
import SpinLoading from '../../common/SpinLoading';

const BottomBtnWrapper = styled.div`
  display: flex;
`;

const BtnBorder = styled(BorderBtn)`
  width: 100%;
  padding: 0.1em 1.1em;

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
        background-color: unset;
      }
    `}
`;

const AlertMsg = styled.div`
  display: block;
  font-size: 0.8rem;
  text-align: center;
  color: ${({ theme, alertMsg }) => (alertMsg ? theme.color.red : 'transparent')};
`;

export default function DeleteSave({
  isChange,
  isLoading,
  fileImg,
  imguuid,
  delSaveImg,
  clickChange,
  alertMsg,
  clickSubmit,
}) {
  const [isModal, setIsModal] = useState(false);

  const clickDelSave = async (state) => {
    if (state === 'save' && !fileImg) return clickSubmit('* 파일을 선택하세요');
    if (state === 'del') setIsModal(false);

    delSaveImg(state).then(() => {
      clickSubmit(null);
    });
  };

  const cancelClick = () => {
    if (!imguuid) return clickSubmit('* 삭제할 파일이 없습니다');
    setIsModal(true);
  };

  return (
    <>
      {isModal && (
        <Modal
          content='정말 삭제하시겠습니까?'
          noClick={() => setIsModal(false)}
          yesClick={() => clickDelSave('del')}
          height='5rem'
        />
      )}
      <BottomBtnWrapper>
        <BtnBorder
          onClick={isChange ? () => clickDelSave('save') : cancelClick}
          disabled={isLoading}
        >
          {isLoading ? <SpinLoading /> : isChange ? '저장' : '삭제'}
        </BtnBorder>
        {isChange && (
          <BtnBorder onClick={clickChange} disabled={isLoading}>
            취소
          </BtnBorder>
        )}
      </BottomBtnWrapper>
      <AlertMsg alertMsg={alertMsg}>{alertMsg}</AlertMsg>
    </>
  );
}
