import React, { memo } from 'react';

const CardBackground = memo(function CardBackground() {
  return (
    <div className="absolute inset-0 rounded-2xl will-change-[opacity,transform]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/5 via-gold-500/[0.02] to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-700
                    will-change-opacity" />
      
      {/* Tech-inspired grid pattern */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700
                    will-change-opacity"
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(250, 189, 0, 0.15) 1px, transparent 0)`,
             backgroundSize: '24px 24px',
             backgroundPosition: 'center',
             willChange: 'opacity'
           }} />
      
      {/* Reactive gradient pulse */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-radial from-gold-500/[0.08] via-gold-500/[0.02] to-transparent
                    opacity-0 group-hover:opacity-100 transition-all duration-700
                    scale-95 group-hover:scale-100 transform-gpu
                    will-change-[opacity,transform]" />
    </div>
  );
});

export default CardBackground;