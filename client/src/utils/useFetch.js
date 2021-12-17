import { useState, useEffect, useCallback } from 'react';
import { getCompletedList, getExpectedList } from '../network/tourmanagement/http';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from '../redux/login/action';
import { useNavigate } from 'react-router-dom';

const useFetch = (page, isActive, sortBy, isComplete) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoginState = useSelector((state) => state.loginReducer);
  const { isLogin } = isLoginState;

  const sendQuery = useCallback(async () => {
    setIsLoading(true);
    if (isActive.approved) {
      try {
        setIsLoading(true);
        const response = await getExpectedList(page, sortBy).then((res) => res);
        console.log(response);
        if (!isLogin && !response.data.guideList) {
          setItems([]);
        } else if (isLogin && !response.data.guideList) {
          dispatch(exit());
          alert('로그인이 만료되어 로그인페이지로 이동합니다.');
          navigate('/login');
        } else {
          if (page.approved === 1) {
            setItems(() => [...new Set([...response.data.guideList])]);
          } else {
            setItems((prev) => [...new Set([...prev, ...response.data.guideList])]);
          }
          setHasMore(response.data.guideList.length === 6);
          setIsLoading(false);
        }
      } catch (e) {
        alert('잠시후에 다시 시도해주세요');
      }
    } else if (isActive.completed) {
      try {
        setIsLoading(true);
        const response = await getCompletedList(page, sortBy).then((res) => res);
        if (!isLogin && !response.data.guideList) {
          setItems([]);
        } else if (isLogin && !response.data.guideList) {
          dispatch(exit());
          alert('로그인이 만료되어 로그인페이지로 이동합니다.');
          navigate('/login');
        } else {
          if (page.completed === 1) {
            setItems(() => [...new Set([...response.data.guideList])]);
          } else {
            setItems((prev) => [...new Set([...prev, ...response.data.guideList])]);
          }
          setHasMore(response.data.guideList.length === 6);
          setIsLoading(false);
        }
      } catch (e) {
        alert('잠시후에 다시 시도해주세요');
      }
    }
  }, [page, isActive.approved, isActive.completed, sortBy, dispatch, navigate, isLogin]);
  useEffect(() => {
    sendQuery();
  }, [sendQuery, page, isComplete]);

  return { hasMore, items, isLoading };
};

export default useFetch;
