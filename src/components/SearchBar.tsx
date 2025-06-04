import React, { useState } from 'react';
import { Search, X, Calendar } from 'lucide-react';
import { EmailFilterOptions } from '../types/email';

interface SearchBarProps {
  filterOptions: EmailFilterOptions;
  onFilterChange: (newOptions: EmailFilterOptions) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filterOptions, onFilterChange }) => {
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterOptions,
      search: e.target.value
    });
  };
  
  const handleClearSearch = () => {
    onFilterChange({
      ...filterOptions,
      search: ''
    });
  };
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterOptions,
      startDate: e.target.value || null
    });
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterOptions,
      endDate: e.target.value || null
    });
  };
  
  const handleClearDates = () => {
    onFilterChange({
      ...filterOptions,
      startDate: null,
      endDate: null
    });
    setIsDateFilterOpen(false);
  };
  
  const toggleDateFilter = () => {
    setIsDateFilterOpen(!isDateFilterOpen);
  };
  
  return (
    <div className="mb-4">
      <div className="relative flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search emails..."
            value={filterOptions.search}
            onChange={handleSearchChange}
          />
          
          {filterOptions.search && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={handleClearSearch}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        <button
          className={`ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            (filterOptions.startDate || filterOptions.endDate) ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-700'
          }`}
          onClick={toggleDateFilter}
          aria-label="Date filter"
        >
          <Calendar className="h-5 w-5" />
        </button>
      </div>
      
      {isDateFilterOpen && (
        <div className="mt-2 p-4 border border-gray-300 rounded-md bg-white shadow-md">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="date"
                id="startDate"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filterOptions.startDate || ''}
                onChange={handleStartDateChange}
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="date"
                id="endDate"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filterOptions.endDate || ''}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={handleClearDates}
            >
              Clear
            </button>
            
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={() => setIsDateFilterOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;