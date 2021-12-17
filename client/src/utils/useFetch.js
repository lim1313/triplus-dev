import { useState, useEffect, useCallback } from 'react';
import { getCompletedList, getExpectedList } from '../network/tourmanagement/http';
import { useDispatch } from 'react-redux';
import { exit } from '../redux/login/action';
import { useNavigate } from 'react-router-dom';

const useFetch = (page, isActive, sortBy, isComplete) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendQuery = useCallback(async () => {
    setIsLoading(true);
    if (isActive.approved) {
      try {
        setIsLoading(true);
        const response = await getExpectedList(page, sortBy).then((res) => res);
        if (response.data.message === 'accessToken이 없습니다') {
          dispatch(exit());
          alert('로그인이 만료되어 로그인페이지로 이동합니다.');
          navigate('/login');
        }
        if (page.approved === 1) {
          setItems(() => [...new Set([...response])]);
        } else {
          setItems((prev) => [...new Set([...prev, ...response])]);
        }
        setHasMore(response.length === 6);
        setIsLoading(false);
      } catch (e) {
        alert('잠시 후 다시 시도해주세요');
      }
    } else if (isActive.completed) {
      try {
        setIsLoading(true);
        const response = await getCompletedList(page, sortBy).then((res) => res.data.guideList);
        if (!response) {
          throw new Error(`서버에 오류가 있습니다.`);
        }
        if (page.completed === 1) {
          setItems(() => [...response]);
        } else {
          setItems((prev) => [...new Set([...prev, ...response])]);
        }
        setHasMore(response.length === 6);
        setIsLoading(false);
      } catch (e) {
        dispatch(exit());
        alert('로그인이 만료되어 로그인페이지로 이동합니다.');
        navigate('/login');
      }
    }
  }, [page, isActive.approved, isActive.completed, sortBy, dispatch, navigate]);
  useEffect(() => {
    sendQuery();
  }, [sendQuery, page, isComplete]);

  return { hasMore, items, isLoading };
};

export default useFetch;
