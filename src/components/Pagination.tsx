import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange
}) => {
  const pageNumbers = [];
  
  // Calculate range of page numbers to display
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);
  
  // Adjust if we're at the end
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  // Items per page options
  const itemsPerPageOptions = [5, 10, 25, 50];
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center mb-2 sm:mb-0">
        <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-600">
          Show:
        </label>
        <select
          id="itemsPerPage"
          className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500
            ${currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100'}
          `}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`
              px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500
              ${currentPage === number 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'}
            `}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500
            ${currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100'}
          `}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="text-sm text-gray-600 mt-2 sm:mt-0">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;