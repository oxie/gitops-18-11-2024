import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabelledBy?: string;
}

const BackgroundEffects = memo(function BackgroundEffects() {
  return (
    <>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/95 to-slate-900" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 189, 0, 0.07) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>
      <div className="absolute -top-64 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-gold-500/20 via-gold-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </>
  );
});

function SectionContainer({ id, children, className = '', ariaLabelledBy }: SectionContainerProps) {
  return (
    <section 
      id={id}
      className={`py-32 relative overflow-visible ${className}`}
      role="region"
      aria-labelledby={ariaLabelledBy}
    >
      <BackgroundEffects />
      <div className="container mx-auto px-6 relative z-10">
        {children}
      </div>
    </section>
  );
}

export default memo(SectionContainer);