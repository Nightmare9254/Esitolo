import { animateSlideTop, staggerChildren } from './Variants';
import { motion } from 'framer-motion';

export const AnimateContainer = ({ children }) => {
  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export const AnimateItem = ({ children }) => {
  return (
    <motion.div
      variants={animateSlideTop}
      style={{ marginTop: '1rem', textAlign: 'center' }}
    >
      {children}
    </motion.div>
  );
};
