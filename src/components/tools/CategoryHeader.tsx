import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryHeaderProps {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  inView: boolean;
}

function CategoryHeader({ id, title, description, Icon, inView }: CategoryHeaderProps) {
  return (
    <div className="p-5">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col gap-2.5"
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg bg-gradient-to-br from-gold-500/10 to-gold-600/5 
                     transition-all duration-300 group-hover:from-gold-500/20 group-hover:to-gold-600/10"
            aria-hidden="true"
          >
            <Icon className="h-5 w-5 text-gold-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 
            id={id}
            className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-gold-400"
          >
            {title}
          </h3>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

export default memo(CategoryHeader);