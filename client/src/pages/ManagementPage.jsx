import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ManageCtn, PageContainer } from '../styles/management/container';
import { Outlet, useLocation } from 'react-router-dom';
import ManageNav from '../components/guidemanagement/ManageNav';
import ManageSection from '../components/guidemanagement/ManageSection';
import CreateModal from '../components/guidecreate/CreateModal';
import { getGuideInfo } from '../network/management/http';

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
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [guideInfo, setGuideInfo] = useState([]);
  const [applicantInfo, setApplicantInfo] = useState([]);
  const [clicked, setClick] = useState({
    management: true,
    managementtourlist: false,
  });
  const handleCreateClick = () => {
    setOpen(!isOpen);
  };
  const handleCloseCreate = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };
  useEffect(() => {
    const path = pathname.split('/').join('');
    console.log(path);
    if (path === 'management') {
      setClick({ management: true, managementtourlist: false });
    } else {
      setClick({ management: false, managementtourlist: true });
    }
    getGuideInfo().then((res) => {
      console.log(res.data);
      setGuideInfo(res.data.guideData);
      setApplicantInfo(res.data.applicant);
    });
  }, [pathname]);

  return (
    <>
      {isOpen ? (
        <CreateModal handleCloseCreate={handleCloseCreate} handleCreateClick={handleCreateClick} />
      ) : null}
      <Background pathName={pathname}>
        <ManageNav pathName={pathname.pathname} clicked={clicked} />
        <Outlet />
        {pathname === '/management' && (
          <ManageCtn>
            <ManageSection
              handleCreateClick={handleCreateClick}
              guideInfo={guideInfo}
              applicantInfo={applicantInfo}
            />
          </ManageCtn>
        )}
      </Background>
    </>
  );
}
