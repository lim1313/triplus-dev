import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorBtn } from '../../../styles/common';
import PwModal from './PwModal';

export const BtnColor = styled(ColorBtn)`
  padding: 0.1em 1.1em;
  width: 50%;
  margin-right: ${({ marginRight }) => marginRight && '0.5rem'};

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
        color: #fff;
        background: ${({ theme }) => theme.color.gray};
        border: 1px solid ${({ theme }) => theme.color.gray};
      }
    `}
`;

export default function Password({ social }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <BtnColor
        palette={social && 'gray'}
        marginRight
        onClick={() => setOpenModal(true)}
        disabled={social}
        title={social && '비밀번호을 수정할 수 없습니다'}
      >
        비밀번호 수정
      </BtnColor>
      {openModal && <PwModal closeModal={() => setOpenModal(false)} />}
    </>
  );
}
