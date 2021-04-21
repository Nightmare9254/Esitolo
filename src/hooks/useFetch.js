import { useEffect, useState, useRef } from 'react';
import { useCounter } from '../store/sub';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  //https://esitolo-backend.herokuapp.com
  useEffect(() => {
    fetch(`https://esitolo-backend.herokuapp.com${url}`)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted.current) {
          setData(json);
          setLoading(false);
        }
      });
  }, [url]);

  return { data, loading, setLoading };
};
