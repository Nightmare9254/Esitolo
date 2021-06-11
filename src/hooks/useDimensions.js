import { useRef, useLayoutEffect, useState } from 'react';

export const useDimensions = () => {
  const ref = useRef();
  const [dimension, setDimension] = useState({});

  useLayoutEffect(() => {
    setDimension(ref.current.getBoundingClientRect().toJSON());
  }, [ref.current]);

  return [ref, dimension];
};
