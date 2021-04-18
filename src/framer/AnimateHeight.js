import { motion } from 'framer-motion';
import { animateHeight } from './Variants';

const AnimateHeight = ({
  isVisible,
  children,
  className,
  init = 'open',
  animate = 'closed',
}) => {
  return (
    <motion.div
      variants={animateHeight}
      initial={isVisible ? init : animate}
      animate={isVisible ? init : animate}
      inherit={false}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateHeight;
