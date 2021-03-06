import {
  animateSlideTop,
  staggerChildren,
  animateOpacity,
  rotateVariants,
} from './Variants';
import { motion } from 'framer-motion';

export const AnimateContainer = ({ children, className = null }) => {
  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimateItem = ({ children, align = 'center' }) => {
  return (
    <motion.div
      variants={animateSlideTop}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ marginTop: '1rem', textAlign: align }}
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

export const PulsingAnimation = () => {
  return (
    <div className="rotate">
      <motion.div
        variants={rotateVariants}
        animate="rotate"
        className="rotate__wrapper"
      />
      <motion.p
        variants={rotateVariants}
        initial="scaleInitial"
        animate="scaleAnimate"
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
        className="rotate__title"
      >
        Esitolo
      </motion.p>
    </div>
  );
};

export const ScaleButtonClick = ({ children, from = 0, className = null }) => {
  return (
    <motion.div whileTap={{ scale: 1.05 }} className={className}>
      {children}
    </motion.div>
  );
};
