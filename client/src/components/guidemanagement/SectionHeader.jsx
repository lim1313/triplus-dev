import React from 'react';
import { H2 } from '../../styles/common/index';
import styled from 'styled-components';

const ManageH2 = styled(H2)`
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
    /* position: absolute;
    left: 30%; */
    text-align: center;
  }
`;

export default function SectionHeader() {
  return <ManageH2 palette='red'>진행중인 가이드</ManageH2>;
}
