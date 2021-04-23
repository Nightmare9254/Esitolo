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

export const LoadingAnimation = () => {
  return (
    <motion.p
      className="animation"
      animate={{ opacity: 1, color: ['#929292', '#fac646'] }}
      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
    >
      Esitolo
    </motion.p>
  );
};
