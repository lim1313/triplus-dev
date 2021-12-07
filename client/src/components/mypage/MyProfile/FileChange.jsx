import React from 'react';
import styled, { css } from 'styled-components';
import { ColorBtn } from '../../../styles/common';

const LabelBtnColor = styled(ColorBtn).attrs({ as: 'label' })`
  text-align: center;
  padding: 0.1em 1.1em;
  margin-bottom: 0.5rem;

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.color.blue};
        color: #fff;
      }
    `}
`;

const BtnColor = styled(ColorBtn)`
  text-align: center;
  padding: 0.1em 1.1em;
  margin-bottom: 0.5rem;

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.color.blue};
        color: #fff;
      }
    `}
`;

export default function FileChange({ selectImage, isLoading, isChange, fileImg, clickChange }) {
  return (
    <>
      <input
        type='file'
        id='upload'
        onChange={selectImage}
        accept='.png, .jpg, .jpeg'
        disabled={isLoading}
      />
      {isChange ? (
        <LabelBtnColor htmlFor='upload' palette='blue' disabled={isLoading}>
          {(fileImg && fileImg.name.slice(0, 12) + '...') || '파일선택'}
        </LabelBtnColor>
      ) : (
        <BtnColor onClick={clickChange} palette='blue' disabled={isLoading}>
          수정
        </BtnColor>
      )}
    </>
  );
}
