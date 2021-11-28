import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../../styles/login/LoginInput';

export default function AdminId(props) {
  const { adminId, handleIdChange } = props;
  return (
    <InputBlock>
      <LoginLabel for='idInput'>ID</LoginLabel>
      <LoginInput id='idInput' placeholder='아이디' onChange={handleIdChange} value={adminId} />
    </InputBlock>
  );
}
