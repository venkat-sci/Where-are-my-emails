import React from 'react';
import Header from './components/Header';
import EmailList from './components/EmailList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import SortControl from './components/SortControl';
import SelectionControls from './components/SelectionControls';
import { useEmails } from './hooks/useEmails';

function App() {
  const {
    paginatedEmails,
    filterOptions,
    currentPage,
    itemsPerPage,
    totalPages,
    selectionState,
    filteredEmails,
    setFilterOptions,
    setCurrentPage,
    setItemsPerPage,
    toggleFavorite,
    toggleSelection,
    selectPage,
    deselectPage,
    selectAllMatching,
    clearSelection,
    favoriteSelected,
    unfavoriteSelected,
    markSelectedAsRead,
    markSelectedAsUnread
  } = useEmails();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Inbox</h2>
          
          <SearchBar 
            filterOptions={filterOptions} 
            onFilterChange={setFilterOptions} 
          />
          
          <SortControl
            filterOptions={filterOptions}
            onFilterChange={setFilterOptions}
          />
          
          <SelectionControls
            selectionState={selectionState}
            toggleSelection={toggleSelection}
            selectPage={selectPage}
            deselectPage={deselectPage}
            selectAllMatching={selectAllMatching}
            clearSelection={clearSelection}
            favoriteSelected={favoriteSelected}
            unfavoriteSelected={unfavoriteSelected}
            markSelectedAsRead={markSelectedAsRead}
            markSelectedAsUnread={markSelectedAsUnread}
            totalMatchingCount={filteredEmails.length}
            visibleCount={paginatedEmails.length}
          />
          
          <EmailList 
            emails={paginatedEmails}
            selectedIds={selectionState.selectedIds}
            onSelectEmail={toggleSelection}
            onToggleFavorite={toggleFavorite}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 MailBox. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;