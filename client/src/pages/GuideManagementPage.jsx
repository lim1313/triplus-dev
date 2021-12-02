import React from 'react';
import { PageContainer, ManageCtn } from '../styles/management/container';
import styled from 'styled-components';
import ManageNav from '../components/management/ManageNav';
import ManageSection from '../components/management/ManageSection';

const Background = styled(PageContainer)`
  background: linear-gradient(#fa4b62, #f7929f);
  background-size: 100vw 25vh;
  background-repeat: no-repeat;
  align-items: baseline;
`;

export default function GuideManagementPage() {
  return (
    <Background>
      <ManageCtn>
        <ManageNav />
        <ManageSection />
      </ManageCtn>
    </Background>
  );
}
