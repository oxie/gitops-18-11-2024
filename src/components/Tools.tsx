import React, { memo } from 'react';
import { Terminal } from 'lucide-react';
import CategoryCard from './tools/CategoryCard';
import { toolCategories } from './tools/ToolCategories';
import SectionContainer from './common/SectionContainer';
import SectionTitle from './common/SectionTitle';

const CategoryGrid = memo(function CategoryGrid() {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 auto-rows-fr"
      role="list"
      aria-label="Technology categories"
    >
      {toolCategories.map((category, index) => (
        <CategoryCard
          key={category.title}
          category={category}
          index={index}
        />
      ))}
    </div>
  );
});

function Tools() {
  return (
    <SectionContainer 
      id="technology"
      ariaLabelledBy="tools-title"
    >
      <SectionTitle
        id="tools-title"
        title="Technology Stack"
        description="Production-grade open source solutions powered by industry-proven tools."
        icon={Terminal}
      />
      <CategoryGrid />
    </SectionContainer>
  );
}

export default memo(Tools);