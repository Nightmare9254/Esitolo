import { motion } from 'framer-motion';
import { animateHeight, animateWidth } from './Variants';

const AnimateHeight = ({
  isVisible,
  children,
  className,
  init = 'open',
  animate = 'closed',
  from,
}) => {
  return (
    <motion.div
      variants={from ? animateWidth : animateHeight}
      initial={isVisible ? init : animate}
      animate={isVisible ? init : animate}
      inherit={false}
      className={className}
      layout
    >
      {children}
    </motion.div>
  );
};

export default AnimateHeight;
