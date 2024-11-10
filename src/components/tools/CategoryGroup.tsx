import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface CategoryGroupProps {
  title: string;
  description: string;
  icon: typeof Terminal;
  items: readonly string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.015 }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    transform: 'translate3d(-5px, 0, 0)'
  },
  visible: { 
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const CategoryHeader = memo(function CategoryHeader({ 
  title, 
  description, 
  Icon 
}: { 
  title: string; 
  description: string; 
  Icon: typeof Terminal;
}) {
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-gold-500/10 to-gold-600/5 transition-all duration-300 group-hover:from-gold-500/20 group-hover:to-gold-600/10">
            <Icon className="h-5 w-5 text-gold-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-gold-400">
            {title}
          </h3>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        <p className="text-sm text-slate-200 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
});

const CategoryItem = memo(function CategoryItem({ 
  item, 
  isLast 
}: { 
  item: string; 
  isLast: boolean;
}) {
  return (
    <motion.div 
      variants={itemVariants}
      className="group/item flex items-center space-x-2 pl-2 py-1 rounded-md transition-all duration-200 hover:bg-slate-800/70"
    >
      <span className="text-slate-400 text-xs sm:text-sm font-light tracking-tight transition-colors duration-200 group-hover/item:text-gold-500">
        {isLast ? '└──' : '├──'}
      </span>
      <span className="text-white text-xs sm:text-sm tracking-tight leading-none transition-colors duration-200 group-hover/item:text-gold-400 truncate font-medium">
        {item}
      </span>
    </motion.div>
  );
});

const HoverEffects = memo(function HoverEffects() {
  return (
    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
      
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
    </div>
  );
});

const CategoryGroup = memo(function CategoryGroup({ 
  title, 
  description,
  icon: Icon, 
  items 
}: CategoryGroupProps) {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold-500/10 to-gold-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.3 }}
        className="relative h-full rounded-lg bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 group-hover:border-gold-500/50 group-hover:bg-slate-800/40 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(250,189,0,0.15)]"
      >
        <div className="relative h-full flex flex-col">
          <CategoryHeader title={title} description={description} Icon={Icon} />

          <div className="flex-1 p-5 font-mono text-[13px]">
            <div className="flex items-center space-x-1.5 mb-3 text-[11px] sm:text-xs bg-slate-800/80 px-3 py-1.5 rounded-md">
              <span className="text-slate-400">root@GitOps/NOW/</span>
              <span className="text-gold-400 font-semibold">{title.toUpperCase().replace(/\s+/g, '-')}</span>
              <span className="text-slate-400">/</span>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%", amount: 0.2 }}
            >
              {items.map((item, idx) => (
                <CategoryItem 
                  key={item} 
                  item={item} 
                  isLast={idx === items.length - 1} 
                />
              ))}
            </motion.div>
          </div>
        </div>

        <HoverEffects />
      </motion.div>
    </div>
  );
});

export default CategoryGroup;