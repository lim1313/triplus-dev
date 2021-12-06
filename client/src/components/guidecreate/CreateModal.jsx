import React from 'react';
import { Background, ModalWrapper } from '../../styles/common/modal';

export default function CreateModal(props) {
  const { handleCloseCreate } = props;
  return (
    <Background onClick={handleCloseCreate} name='Background'>
      <ModalWrapper></ModalWrapper>
    </Background>
  );
}
