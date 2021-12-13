import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ManageCtn } from '../styles/management/container';
import styled from 'styled-components';
import TourFilter from '../components/tourmanagement/TourFilter';
import OrderFilter from '../components/tourmanagement/OrderFilter';
import ListSection from '../components/tourmanagement/ListSection';
import { useSelector } from 'react-redux';
import TourModal from '../components/tourmanagement/tourModal/TourModal';
import SpinLoading from '../components/common/SpinLoading';
import useFetch from '../utils/useFetch';

const SectionCtn = styled.section`
  width: 70vw;
  border-radius: 0.5rem;
  background-color: white;
  height: ${({ count }) => (count.length < 4 ? '700px' : 'auto')};
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    padding: 0.5rem;
    border-radius: 0;
    margin-top: 2rem;
  }
`;

export default function TourManagementPage() {
  //상태관리
  const state = useSelector((state) => state.openTourModalReducer);
  const { isOpen, modalInfo } = state;
  const [pageNum, setPageNum] = useState({ approved: 1, completed: 0 });
  const [isActive, setIsActive] = useState({ approved: true, completed: false });
  const [isListItems, setListItems] = useState([
    {
      title: '안녕1',
      gender: 'false',
      guideDate: '2022.2.17',
      tourImage: '',
      userImage: '',
      state: 'APPROVED',
      nickName: '멋진여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
      address: '서울',
      openDate: '몰라',
    },
    {
      title: '안녕2',
      gender: 'false',
      guideDate: '2022.2.17',
      tourImage: '',
      userImage: '',
      state: 'APPROVED',
      nickName: '예쁜여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
      address: '부천',
      openDate: '몰라',
    },
    {
      title: '안녕3',
      gender: 'false',
      guideDate: '2021.8.17',
      tourImage: '',
      userImage: '',
      state: 'COMPLETED',
      nickName: '귀여운여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
      address: '대전',
      openDate: '몰라',
    },
  ]);
  const [isFiltered, setIsFiltered] = useState([]);

  const observerRef = useRef();
  const { items, hasMore, isLoading } = useFetch(pageNum, isActive);

  //초기 아이템리스트 세팅
  useEffect(() => {
    setIsFiltered(isListItems);
  }, [isListItems]);

  //oberver핸들함수
  const observer = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore && isActive.approved) {
          setPageNum({ ...pageNum, approved: pageNum.approved + 1, completed: 0 });
        } else if (entry.isIntersecting && hasMore && isActive.completed) {
          setPageNum({ ...pageNum, completed: pageNum.completed + 1, approved: 0 });
        }
      });
      node && observerRef.current.observe(node);
    },
    [hasMore, isLoading, pageNum, isActive.approved, isActive.completed]
  );

  const handleAllClick = () => {
    setIsFiltered(isListItems);
    setIsActive({ ...isActive, all: true, approved: false, completed: false });
  };
  const handleApprovedClick = () => {
    setIsFiltered(isListItems.filter((el) => el.state === 'APPROVED'));
    setIsActive({ ...isActive, all: false, approved: true, completed: false });
  };
  const handleCompletedClick = () => {
    setIsFiltered(isListItems.filter((el) => el.state === 'COMPLETED'));
    setIsActive({ ...isActive, all: false, approved: false, completed: true });
  };

  return (
    <>
      {isOpen ? <TourModal modalInfo={modalInfo} /> : null}
      <ManageCtn>
        <SectionCtn id='scrollArea' count={isFiltered}>
          <TourFilter
            handleAllClick={handleAllClick}
            handleApprovedClick={handleApprovedClick}
            handleCompletedClick={handleCompletedClick}
            isActive={isActive}
          />
          <OrderFilter />
          <ListSection isFiltered={isFiltered} setListItems={setListItems} items={items} />
        </SectionCtn>
        {isLoading && isFiltered.length > 3 && <SpinLoading />}
        <div ref={observer} style={{ backgroundColor: 'red', width: '200px', height: '1px' }} />
      </ManageCtn>
    </>
  );
}
