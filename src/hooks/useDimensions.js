import { useRef, useLayoutEffect, useState, useEffect } from 'react';

// export const useDimensions = () => {
//   const ref = useRef();
//   const [dimension, setDimension] = useState({});

//   useLayoutEffect(() => {
//     setDimension(ref.current.getBoundingClientRect().toJSON());
//   }, [ref]);

//   return [ref, dimension];
// };
export const useDimensions = () => {
  const getWindowDimension = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return { width, height };
  };
  const [dimensions, setDimensions] = useState(getWindowDimension());

  const handleResize = () => {
    setDimensions(getWindowDimension());
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return dimensions;
};
