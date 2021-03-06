const animateHeight = {
  open: {
    height: '20vh',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.5,
    },
  },
  closed: {
    height: '80vh',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.5,
    },
  },
  exit: { opacity: 0 },
};
const animateWidth = {
  open: {
    width: '20vw',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.5,
    },
  },
  closed: {
    width: '80vw',
    padding: '2rem',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.5,
    },
  },
  exit: { opacity: 0 },
};

const animateSlideTop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 1,
    },
  },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const animateOpacity = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

const rotateVariants = {
  rotate: {
    rotate: '360deg',
    transition: {
      type: 'tween',
      duration: 1,
      repeat: Infinity,
    },
  },
  transition: {
    repeat: Infinity,
    repeatType: 'reverse',
    duration: 1,
  },
  scaleInitial: {
    scale: 0.7,
  },
  scaleAnimate: {
    scale: 1.2,
    color: ['#d0d0d0', '#fac646'],
  },
};

export {
  animateHeight,
  animateSlideTop,
  staggerChildren,
  rotateVariants,
  animateOpacity,
  animateWidth,
};
