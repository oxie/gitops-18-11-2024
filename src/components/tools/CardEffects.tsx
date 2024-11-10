import React, { memo } from 'react';

const CardEffects = memo(function CardEffects() {
  return (
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 pointer-events-none transform-gpu">
      {/* Simple border glow on hover */}
      <div className="absolute -inset-[1px] rounded-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold-500/20 to-gold-500/20
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />
      </div>
    </div>
  );
});

export default CardEffects;