import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { EmailFilterOptions } from '../types/email';

interface SortControlProps {
  filterOptions: EmailFilterOptions;
  onFilterChange: (newOptions: EmailFilterOptions) => void;
}

const SortControl: React.FC<SortControlProps> = ({ filterOptions, onFilterChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Title' },
    { value: 'favorite', label: 'Favorite' },
  ];
  
  const handleSortByChange = (sortBy: 'date' | 'title' | 'favorite') => {
    onFilterChange({
      ...filterOptions,
      sortBy
    });
    setIsOpen(false);
  };
  
  const toggleSortDirection = () => {
    onFilterChange({
      ...filterOptions,
      sortDirection: filterOptions.sortDirection === 'asc' ? 'desc' : 'asc'
    });
  };
  
  const toggleFavoritesOnly = () => {
    onFilterChange({
      ...filterOptions,
      favoritesOnly: !filterOptions.favoritesOnly
    });
  };
  
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative">
        <button
          className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Sort by: {sortOptions.find(opt => opt.value === filterOptions.sortBy)?.label}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-48 bg-white shadow-lg rounded-md py-1 border border-gray-300">
            {sortOptions.map(option => (
              <button
                key={option.value}
                className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                  filterOptions.sortBy === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                onClick={() => handleSortByChange(option.value as 'date' | 'title' | 'favorite')}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <button
        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={toggleSortDirection}
        title={`Sort ${filterOptions.sortDirection === 'asc' ? 'ascending' : 'descending'}`}
      >
        <ArrowUpDown className={`h-5 w-5 ${filterOptions.sortDirection === 'asc' ? 'text-blue-600' : 'rotate-180 text-blue-600'}`} />
      </button>
      
      <button
        className={`px-3 py-2 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          filterOptions.favoritesOnly ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        onClick={toggleFavoritesOnly}
      >
        {filterOptions.favoritesOnly ? 'Favorites only' : 'All emails'}
      </button>
    </div>
  );
};

export default SortControl;