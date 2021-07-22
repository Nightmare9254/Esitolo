import { useEffect, useState, useRef } from 'react';

export const useFetch = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}${url}`)
      .then(res => res.json())
      .then(json => {
        if (isMounted.current) {
          setData(json);
          setLoading(false);
        }
      });
  }, [url]);

  return { data, loading, setLoading };
};
