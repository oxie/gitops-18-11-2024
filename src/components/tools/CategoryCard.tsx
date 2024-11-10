import React, { memo, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Tag from './Tag';
import CategoryHeader from './CategoryHeader';
import CardBackground from './CardBackground';

interface CategoryCardProps {
  category: {
    title: string;
    description: string;
    icon: LucideIcon;
    items: readonly string[];
  };
  index: number;
}

// Memoized animation variants
const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
      ease: [0.23, 1, 0.32, 1],
      duration: 0.4
    }
  },
  hover: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
      ease: [0.23, 1, 0.32, 1],
      duration: 0.6
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      ease: [0.23, 1, 0.32, 1],
      duration: 0.3
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  }
} as const;

// Optimized tag list with virtualization for large lists
const TagList = memo(function TagList({ 
  items, 
  inView,
  categoryTitle 
}: { 
  items: readonly string[];
  inView: boolean;
  categoryTitle: string;
}) {
  const renderTag = useCallback((item: string, idx: number) => (
    <Tag 
      key={`${categoryTitle}-${item}`}
      name={item} 
      index={idx} 
    />
  ), [categoryTitle]);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial="initial"
        animate={inView ? "visible" : "initial"}
        whileHover="hover"
        whileTap="hover"
        exit="exit"
        variants={listVariants}
        className="flex flex-wrap gap-1.5 min-h-[4.5rem] will-change-transform p-1 -m-1"
        role="list"
        aria-label={`Technologies in ${categoryTitle}`}
        layout="position"
      >
        {items.map(renderTag)}
      </motion.div>
    </AnimatePresence>
  );
});

// Optimized shine effect with reduced repaints
const ShineEffect = memo(function ShineEffect() {
  return (
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                pointer-events-none overflow-hidden will-change-[opacity,transform] transform-gpu"
      aria-hidden="true"
    >
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
                    bg-gradient-to-r from-transparent via-white/[0.07] to-transparent
                    will-change-transform transform-gpu" />
    </div>
  );
});

function CategoryCard({ category, index }: CategoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-10% 0px",
    amount: 0.2,
    rootMargin: "50px"
  });

  const customVariants = {
    ...cardVariants,
    visible: {
      ...cardVariants.visible,
      transition: {
        ...cardVariants.visible.transition,
        delay: Math.min(index * 0.1, 0.3)
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={customVariants}
      className="group relative will-change-transform transform-gpu"
      role="article"
      aria-labelledby={`category-title-${index}`}
      layout="position"
    >
      <CardBackground />
      
      <div className="relative rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 
                    hover:border-gold-500/50 transition-all duration-500
                    hover:shadow-[0_0_30px_rgba(250,189,0,0.1)]
                    hover:bg-slate-800/60
                    overflow-hidden
                    will-change-[border-color,box-shadow,background-color]
                    transform-gpu">
        <CategoryHeader 
          id={`category-title-${index}`}
          title={category.title}
          description={category.description}
          Icon={category.icon}
          inView={inView}
        />

        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent 
                        group-hover:via-gold-500/30 transition-colors duration-500
                        will-change-[background-color] transform-gpu" />
        </div>

        <div className="p-5">
          <TagList 
            items={category.items} 
            inView={inView} 
            categoryTitle={category.title}
          />
        </div>

        <ShineEffect />
      </div>
    </motion.div>
  );
}

export default memo(CategoryCard);