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
  hidden: {},
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

const rotateSquare = {
  hidden: { x: 0, scale: 0.5 },
  visible: {
    x: '200px',
    scale: 1.5,
    rotate: '360deg',
    transition: {
      type: 'tween',
      repeatType: 'reverse',

      repeat: Infinity,
      duration: 1,
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
};
