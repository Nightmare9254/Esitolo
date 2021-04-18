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
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

export { animateHeight, animateSlideTop, staggerChildren };
