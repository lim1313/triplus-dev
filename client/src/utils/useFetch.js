import { useState, useEffect, useCallback } from 'react';
import { getCompletedList, getExpectedList } from '../network/tourmanagement/http';

const useFetch = (page, isActive, sortBy) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendQuery = useCallback(async () => {
    setIsLoading(true);
    if (isActive.approved) {
      try {
        setIsLoading(true);
        const response = await getExpectedList(page, sortBy).then((res) => res.data.guideList);
        console.log(response);
        if (!response) {
          throw new Error(`서버에 오류가 있습니다.`);
        }
        if (page.approved === 1) {
          setItems(() => [...new Set([...response])]);
        } else {
          setItems((prev) => [...new Set([...prev, ...response])]);
        }
        setHasMore(response.length === 6);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    } else if (isActive.completed) {
      console.log(isActive.completed);
      console.log(page);
      try {
        setIsLoading(true);
        const response = await getCompletedList(page).then((res) => res.data.guideList);
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
        console.log(e);
      }
    }
  }, [page, isActive.approved, isActive.completed, sortBy]);
  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { hasMore, items, isLoading };
};

export default useFetch;
