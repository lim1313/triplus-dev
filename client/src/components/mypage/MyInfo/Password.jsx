import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../../styles/common';
import PwModal from './PwModal';

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 1.1em;
  width: 50%;
  margin-right: ${({ marginRight }) => marginRight && '0.5rem'};

  &:hover {
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
  }
`;

export default function Password({ social }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <BtnColor
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
