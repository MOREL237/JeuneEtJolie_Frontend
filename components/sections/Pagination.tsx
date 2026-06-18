// components/sections/Pagination.tsx
'use client';

import React, { useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void; // 🆕 Optionnel
  showInfo?: boolean; // 🆕 Afficher "Page X sur Y"
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = false, // 🆕 Default false
}: PaginationProps) => {
  // 🆕 Memoized visible pages
  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  // 🆕 Memoized click handler
  const handlePageChange = useCallback((page: number) => {
    onPageChange?.(page);
  }, [onPageChange]);

  // 🆕 Si une seule page, ne rien afficher
  if (totalPages <= 1) return null;

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      {/* 🆕 Info optionnelle */}
      {showInfo && (
        <p className="text-sm text-on-surface-variant font-label-md">
          Page {currentPage} sur {totalPages}
        </p>
      )}
      
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Page précédente"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pages */}
        {visiblePages.map((page, index) => (
          <React.Fragment key={`page-${page}-${index}`}>
            {page === '...' ? (
              <span className="w-10 h-10 flex items-center justify-center text-on-surface-variant text-sm">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all ${
                  currentPage === page
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'border border-outline-variant text-on-surface hover:border-primary hover:text-primary hover:bg-primary/5'
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Page suivante"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;