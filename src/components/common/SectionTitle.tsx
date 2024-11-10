import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  description: string;
  icon: LucideIcon;
  id: string;
}

function SectionTitle({ title, description, icon: Icon, id }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <div className="section-title">
        <div className="section-title-wrapper group">
          <div className="section-title-icon">
            <Icon className="h-6 w-6 text-gold-400" />
          </div>
          <h2 id={id} className="section-title-text">
            {title}
          </h2>
        </div>
      </div>
      <p className="section-description">
        {description}
      </p>
    </motion.div>
  );
}

export default memo(SectionTitle);