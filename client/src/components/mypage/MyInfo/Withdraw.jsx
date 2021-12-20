import React, { useState } from 'react';
import styled from 'styled-components';
import { BorderBtn } from '../../../styles/common';
import WithdrawModal from './WithdrawModal';

const BtnBorder = styled(BorderBtn)`
  padding: 0.1em 1.1em;
  width: 50%;
`;

export default function Withdraw({ social }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <BtnBorder onClick={() => setOpenModal(true)}>회원탈퇴</BtnBorder>
      {openModal && <WithdrawModal closeModal={() => setOpenModal(false)} social={social} />}
    </>
  );
}
