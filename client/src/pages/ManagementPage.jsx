import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ManageCtn, PageContainer } from '../styles/management/container';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ManageNav from '../components/guidemanagement/ManageNav';
import ManageSection from '../components/guidemanagement/ManageSection';
import CreateModal from '../components/guidecreate/CreateModal';
import { getGuideInfo } from '../network/management/http';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../components/common/Modal';
import AlertModal from '../components/common/AlertModal';
import { deleteGuideCard } from '../network/management/http';
import { guideDelete } from '../redux/management/action';
import LoginModal from '../components/common/LoginModal';
import { getDday } from '../utils/dDay';
import { exit } from '../redux/login/action';

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
  const dispatch = useDispatch();
  const isDeleteClick = useSelector((state) => state.guideDeleteReducer);
  const isLoginState = useSelector((state) => state.loginReducer);
  const { isLogin } = isLoginState;
  const [OpenLoginModal, setOpenLoginModal] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [guideInfo, setGuideInfo] = useState([]);
  const [applicantInfo, setApplicantInfo] = useState([]);
  const [isAreadySet, setAreaySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsdeleted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [clicked, setClick] = useState({
    management: true,
    managementtourlist: false,
  });
  const navigate = useNavigate();

  const handleCreateClick = (guideInfo) => {
    if (!isLogin) {
      setOpenLoginModal(true);
      setIsCompleted(false);
      return;
    }
    if (guideInfo.title) {
      setTimeout(() => setAreaySet(true), 0);
      setTimeout(() => {
        setAreaySet(false);
      }, 1000);
    } else {
      setOpen(!isOpen);
      setIsCompleted(false);
    }
  };
  const handleCloseCreate = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
      setIsCompleted(false);
    }
  };
  const handleComplete = () => {
    setIsCompleted(true);
  };
  useEffect(() => {
    setIsLoading(true);

    const path = pathname.split('/').join('');
    if (path === 'management') {
      setClick({ management: true, managementtourlist: false });
    } else {
      setClick({ management: false, managementtourlist: true });
    }
    getGuideInfo()
      .then((res) => {
        console.log(res.data);
        setGuideInfo(res.data.guideData);
        setApplicantInfo(res.data.applicant);
        console.log(res.data.applicant);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (isLogin === true) {
          dispatch(exit());
          alert('로그인이 만료되어 로그인페이지로 이동합니다.');
          navigate('/login');
        }
      });
  }, [pathname, isDeleted, isCompleted, dispatch, isLogin, navigate]);
  return (
    <>
      {isOpen ? (
        <CreateModal
          handleCloseCreate={handleCloseCreate}
          handleCreateClick={handleCreateClick}
          handleComplete={handleComplete}
          isCompleted={isCompleted}
        />
      ) : null}
      {isDeleteClick && (
        <Modal
          content={'등록하신 가이드를 삭제하시겠습니까?'}
          yesClick={() => {
            if (getDday(guideInfo.guideDate) !== 1) {
              deleteGuideCard(guideInfo.guideId)
                .then((res) => {
                  if (res.status === 200) {
                    dispatch(guideDelete());
                    setTimeout(() => setIsdeleted(true), 0);
                    setTimeout(() => setIsdeleted(false), 1000);
                  }
                })
                .catch((err) => dispatch(guideDelete()));
            } else {
              setTimeout(() => setIsAlertOpen(true), 0);
              setTimeout(() => setIsAlertOpen(false), 1000);
            }
          }}
          noClick={() => {
            dispatch(guideDelete());
          }}
        />
      )}
      {isDeleted && <AlertModal content={'삭제되었습니다.'} />}
      {isAreadySet && <AlertModal content={'이미 등록된 가이드가 있습니다.'} />}
      {isAlertOpen && <AlertModal content={'여행 하루전에는 취소가 불가능합니다.'} />}
      {OpenLoginModal && (
        <LoginModal
          content={'로그인된 여행자님만 이용가능합니다. 로그인하시겠습니까?'}
          noClick={() => {
            setOpenLoginModal(false);
          }}
          yesClick={() => {
            navigate('/login');
          }}
        />
      )}
      <Background pathName={pathname}>
        <ManageNav pathName={pathname.pathname} clicked={clicked} />
        <Outlet />
        {pathname === '/management' && (
          <ManageCtn>
            <ManageSection
              handleCreateClick={handleCreateClick}
              guideInfo={guideInfo}
              applicantInfo={applicantInfo}
              isLoading={isLoading}
            />
          </ManageCtn>
        )}
      </Background>
    </>
  );
}
