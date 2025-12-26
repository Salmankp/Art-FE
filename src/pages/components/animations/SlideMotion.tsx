import { motion } from 'framer-motion';
import React from 'react';

let dir = 100;

let horiz = false;

interface SlideMotionProps {
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const SlideMotion: React.FC<SlideMotionProps> = ({
  direction,
  className,
  children,
}) => {
  switch (direction) {
    case 'up':
      dir = 100;
      break;
    case 'down':
      dir = -100;
      break;
    case 'left':
      dir = 100;
      horiz = true;
      break;
    case 'right':
      dir = -100;
      horiz = true;
      break;
    default:
      dir = 100;
      break;
  }

  const variants = {
    hidden: { opacity: 0, y: horiz ? 0 : dir, x: horiz ? dir : 0 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.75 } },
    exit: {
      opacity: 0,
      transition: { duration: 0.75 },
    },
  };

  return (
    <motion.div
      className={className}
      initial={Object.keys(variants)[0]}
      animate={Object.keys(variants)[1]}
      exit={Object.keys(variants)[2]}
      {...{ variants }}
    >
      {children}
    </motion.div>
  );
};

export default SlideMotion;
