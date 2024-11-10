import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface TagProps {
  name: string;
  index: number;
}

const tagVariants = {
  initial: { 
    opacity: 0,
    transform: 'translate3d(0, 5px, 0)'
  },
  visible: { 
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  hover: {
    transform: 'translate3d(0, -2px, 0) scale(1.05)',
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: {
    transform: 'translate3d(0, 0, 0) scale(1)',
    transition: {
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1]
    }
  }
} as const;

const spanVariants = {
  hover: {
    backgroundColor: "rgba(250, 189, 0, 0.1)",
    borderColor: "rgba(250, 189, 0, 0.3)",
    color: "rgb(251, 191, 36)",
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }
  },
  exit: {
    backgroundColor: "rgba(51, 65, 85, 0.5)",
    borderColor: "rgba(71, 85, 105, 0.5)",
    color: "rgb(203, 213, 225)",
    transition: {
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1]
    }
  }
} as const;

function Tag({ name, index }: TagProps) {
  const customVariants = {
    ...tagVariants,
    hover: {
      ...tagVariants.hover,
      transition: {
        ...tagVariants.hover.transition,
        delay: index * 0.04
      }
    }
  };

  return (
    <motion.div
      variants={customVariants}
      className="inline-block will-change-transform transform-gpu"
      layout="position"
    >
      <motion.span 
        variants={spanVariants}
        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium
                  bg-slate-700/50 text-slate-300 border border-slate-600/50
                  whitespace-nowrap will-change-[background-color,border-color,color,transform]
                  transition-shadow duration-300 transform-gpu"
        title={name}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}

export default memo(Tag);