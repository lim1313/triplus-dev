import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ManageCtn } from '../styles/management/container';
import styled from 'styled-components';
import TourFilter from '../components/tourmanagement/TourFilter';
import OrderFilter from '../components/tourmanagement/OrderFilter';
import ListSection from '../components/tourmanagement/ListSection';
import { useSelector } from 'react-redux';
import TourModal from '../components/tourmanagement/tourModal/TourModal';
import { getAllList, getExpectedList, getCompletedList } from '../network/tourmanagement/http';
import SpinLoading from '../components/common/SpinLoading';

const SectionCtn = styled.section`
  width: 70vw;
  border-radius: 0.5rem;
  background-color: white;
  height: auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
`;

export default function TourManagementPage() {
  //상태관리
  const state = useSelector((state) => state.openTourModalReducer);
  const { isOpen, modalInfo } = state;
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const loader = useRef();
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
    {
      title: '안녕4',
      gender: 'true',
      guideDate: '2022.2.17',
      tourImage: '',
      userImage: '',
      state: 'CANCELED',
      nickName: '야무진여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
      address: '부산',
      openDate: '몰라',
    },
  ]);
  const [isActive, setIsActive] = useState({ all: true, approved: false, completed: false });
  const [isFiltered, setIsFiltered] = useState([]);

  //초기 아이템리스트 세팅
  useEffect(() => {
    getAllList().then((res) => setItemList(res.data));
    setIsFiltered(isListItems);
  }, [isListItems]);

  //서버에서 아이템을 가져오는 함수
  const getMoreItems = useCallback(async () => {
    setLoading(true);
    if (isActive.all) {
      getAllList(pageNum).then((res) => setItemList(res.data));
      setLoading(false);
    } else if (isActive.approved) {
      getExpectedList(pageNum).then((res) => setItemList(res.data));
      setLoading(false);
    } else if (isActive.completed) {
      getCompletedList(pageNum).then((res) => setItemList(res.data));
      setLoading(false);
    }
  }, [pageNum, isActive.all, isActive.approved, isActive.completed]);

  //oberver핸들함수
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // getMoreItems();
        setPageNum(pageNum + 1);
      }
    },
    [pageNum]
  );

  //observer 설정
  useEffect(() => {
    const option = { root: null, rootMargin: '0px', threshold: 1 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

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
        <SectionCtn>
          <TourFilter
            handleAllClick={handleAllClick}
            handleApprovedClick={handleApprovedClick}
            handleCompletedClick={handleCompletedClick}
            isActive={isActive}
          />
          <OrderFilter />
          <ListSection
            isFiltered={isFiltered}
            setListItems={setListItems}
            itemList={itemList}
            getMoreItems={getMoreItems}
          />
          {loading && <SpinLoading />}
        </SectionCtn>
        <div ref={loader} />
      </ManageCtn>
    </>
  );
}
