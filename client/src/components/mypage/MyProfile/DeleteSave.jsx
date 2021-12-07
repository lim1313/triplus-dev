import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BorderBtn } from '../../../styles/common';
import SpinLoading from '../../common/SpinLoading';

const BtnBorder = styled(BorderBtn)`
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

export default function DeleteSave({ isChange, isLoading, fileImg, imguuid, delSaveImg }) {
  const [alertMsg, setAlertMsg] = useState('');

  const clickDelSave = async (state) => {
    if (state === 'save' && !fileImg) return setAlertMsg('* 파일을 선택하세요');

    if (state === 'del' && !imguuid) return setAlertMsg('* 삭제할 파일이 없습니다');

    delSaveImg(state).then(() => {
      setAlertMsg('');
      console.log('end2');
    });
  };

  return (
    <>
      <BtnBorder
        onClick={isChange ? () => clickDelSave('save') : () => clickDelSave('del')}
        disabled={isLoading}
      >
        {isLoading ? <SpinLoading /> : isChange ? '저장' : '삭제'}
      </BtnBorder>
      <AlertMsg alertMsg={alertMsg}>{alertMsg}</AlertMsg>
    </>
  );
}
