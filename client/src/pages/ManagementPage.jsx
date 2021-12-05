import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ManageCtn, PageContainer } from '../styles/management/container';
import { Outlet, useLocation } from 'react-router-dom';
import ManageNav from '../components/guidemanagement/ManageNav';
import ManageSection from '../components/guidemanagement/ManageSection';
import CreateModal from '../components/guidecreate/CreateModal';

const Background = styled(PageContainer)`
  ${({ pathName }) =>
    pathName === '/management'
      ? css`
          background: linear-gradient(#fa4b62, #f7929f);
        `
      : css`
          background: linear-gradient(#3386f7, #7dcbf8);
        `}
  background-size: 100vw 28vh;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
export default function ManagementPage() {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const handleCreateClick = () => {
    setOpen(!isOpen);
  };
  const handleCloseCreate = (e) => {
    const name = e.currentTarget.getAttribute('name');
    if (name === 'Background') {
      setOpen(false);
    }
  };

  return (
    <>
      {isOpen ? <CreateModal handleCloseCreate={handleCloseCreate} /> : null}
      <Background pathName={location.pathname}>
        <ManageNav pathName={location.pathname} />
        <Outlet />
        <ManageCtn>
          <ManageSection handleCreateClick={handleCreateClick} />
        </ManageCtn>
      </Background>
    </>
  );
}
