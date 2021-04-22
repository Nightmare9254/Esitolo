import { animateSlideTop, staggerChildren, animateOpacity } from './Variants';
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
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ marginTop: '1rem', textAlign: 'center' }}
    >
      {children}
    </motion.div>
  );
};

export const ShowInput = ({ children }) => {
  return (
    <motion.div
      variants={animateOpacity}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="all-products__search"
    >
      {children}
    </motion.div>
  );
};
