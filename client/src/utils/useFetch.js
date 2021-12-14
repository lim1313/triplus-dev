import { useState, useEffect, useCallback } from 'react';
import { getCompletedList, getExpectedList } from '../network/tourmanagement/http';

const useFetch = (page, isActive) => {
  const [items, setItmes] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendQuery = useCallback(async () => {
    setIsLoading(true);
    if (isActive.approved) {
      getExpectedList(page)
        .then((res) => {
          setItmes(items.concat(res.data));
          setHasMore(res.data.length > 0 && res.data.length > 5);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (isActive.completed) {
      getCompletedList(page)
        .then((res) => {
          setItmes(items.concat(res.data));
          setHasMore(res.data.length > 0 && res.data.length > 5);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [page, isActive.approved, isActive.completed, items]);
  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { hasMore, items, isLoading };
};

export default useFetch;
