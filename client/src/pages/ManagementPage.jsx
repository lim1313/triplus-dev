import React from 'react';
import styled, { css } from 'styled-components';
import { PageContainer } from '../styles/management/container';
import { Outlet, useLocation } from 'react-router-dom';
import ManageNav from '../components/guidemanagement/ManageNav';

const Background = styled(PageContainer)`
  ${({ pathName }) =>
    pathName === '/management/guidelist'
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
  console.log(location.pathname);
  // const navigate = useNavigate();
  // navigate('/management/guidelist');
  return (
    <Background pathName={location.pathname}>
      <ManageNav pathName={location.pathname} />
      <Outlet />
    </Background>
  );
}
