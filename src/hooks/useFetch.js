import { useEffect, useState, useRef } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const isLoad = useRef(true);

  useEffect(() => {
    return () => {
      isLoad.current = false;
    };
  }, []);

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((json) => {
        if (isLoad.current) {
          setData(json);
        }
      });
  }, [url]);

  return data;
};
