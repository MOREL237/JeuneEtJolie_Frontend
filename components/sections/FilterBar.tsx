'use client';

import { useState } from 'react';

interface FilterBarProps {
  categories: string[];
  totalItems: number;
  activeCategory: string;
}

export const FilterBar = ({ categories, totalItems, activeCategory: initialActive }: FilterBarProps) => {
  const [activeCategory, setActiveCategory] = useState(initialActive);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <section className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-8 md:py-10">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-6 gap-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-label-md transition-all ${
                category === activeCategory
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed-dim'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-8">
          {/* Price range - desktop only */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-label-md text-on-surface-variant uppercase">Prix</span>
            <input 
              type="range" 
              className="accent-primary w-32 h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Total items */}
          <div className="flex items-center gap-2">
            <span className="text-label-md font-bold text-on-surface">
              {totalItems} articles trouvés
            </span>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button 
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-label-md uppercase tracking-wider text-on-surface-variant border-b border-transparent hover:border-primary py-1"
            >
              Trier par
              <span className={`material-symbols-outlined text-sm transition-transform ${sortOpen ? 'rotate-180' : ''}`}>
                keyboard_arrow_down
              </span>
            </button>
            
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-outline-variant py-2 z-50">
                {['Prix croissant', 'Prix décroissant', 'Nouveautés', 'Populaires'].map((option) => (
                  <button
                    key={option}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-surface-container transition-colors"
                    onClick={() => setSortOpen(false)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;