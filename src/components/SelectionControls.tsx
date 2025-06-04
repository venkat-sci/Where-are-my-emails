import React from 'react';
import { Star, StarOff, Mail, MailOpen, Trash2 } from 'lucide-react';
import { SelectionState } from '../types/email';

interface SelectionControlsProps {
  selectionState: SelectionState;
  toggleSelection: (id: string) => void;
  selectPage: () => void;
  deselectPage: () => void;
  selectAllMatching: () => void;
  clearSelection: () => void;
  favoriteSelected: () => void;
  unfavoriteSelected: () => void;
  markSelectedAsRead: () => void;
  markSelectedAsUnread: () => void;
  totalMatchingCount: number;
  visibleCount: number;
}

const SelectionControls: React.FC<SelectionControlsProps> = ({
  selectionState,
  selectPage,
  deselectPage,
  selectAllMatching,
  clearSelection,
  favoriteSelected,
  unfavoriteSelected,
  markSelectedAsRead,
  markSelectedAsUnread,
  totalMatchingCount,
  visibleCount
}) => {
  const { selectedIds, selectionMode } = selectionState;
  const selectedCount = selectedIds.size;
  const isAllSelected = selectionMode === 'all' || selectionMode === 'allMatching';
  const hasSelection = selectedCount > 0;
  
  const handleSelectToggle = () => {
    if (isAllSelected || selectedCount === visibleCount) {
      deselectPage();
    } else {
      selectPage();
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-md mb-4 overflow-hidden">
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAllSelected || selectedCount === visibleCount}
            onChange={handleSelectToggle}
            className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
          />
          
          <div className="relative ml-2">
            <button
              onClick={(e) => {
                const target = e.currentTarget;
                const rect = target.getBoundingClientRect();
                const dropdown = document.getElementById('selection-dropdown');
                if (dropdown) {
                  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                  dropdown.style.left = `${rect.left}px`;
                  dropdown.style.top = `${rect.bottom + window.scrollY + 5}px`;
                }
              }}
              className="text-sm text-gray-700 hover:text-blue-500 focus:outline-none focus:text-blue-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              id="selection-dropdown"
              className="hidden absolute z-10 mt-1 w-48 bg-white shadow-lg rounded-md py-1 border border-gray-300"
              style={{ left: '0', top: '100%' }}
            >
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={selectPage}
              >
                Select all on this page
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={selectAllMatching}
              >
                Select all matching ({totalMatchingCount})
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={clearSelection}
                disabled={!hasSelection}
              >
                Deselect all
              </button>
            </div>
          </div>
        </div>
        
        {hasSelection ? (
          <div className="ml-4 text-sm text-gray-700">
            {selectedCount} {selectedCount === 1 ? 'email' : 'emails'} selected
            {selectionMode === 'allMatching' && ` (all ${totalMatchingCount} matching emails)`}
          </div>
        ) : (
          <div className="ml-4 text-sm text-gray-500">
            No emails selected
          </div>
        )}
        
        <div className="ml-auto flex">
          <button
            className={`
              p-1.5 rounded-md mr-1 focus:outline-none
              ${hasSelection ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}
            `}
            onClick={favoriteSelected}
            disabled={!hasSelection}
            title="Mark as favorite"
          >
            <Star className="h-5 w-5" />
          </button>
          
          <button
            className={`
              p-1.5 rounded-md mr-1 focus:outline-none
              ${hasSelection ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}
            `}
            onClick={unfavoriteSelected}
            disabled={!hasSelection}
            title="Remove from favorites"
          >
            <StarOff className="h-5 w-5" />
          </button>
          
          <button
            className={`
              p-1.5 rounded-md mr-1 focus:outline-none
              ${hasSelection ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}
            `}
            onClick={markSelectedAsRead}
            disabled={!hasSelection}
            title="Mark as read"
          >
            <MailOpen className="h-5 w-5" />
          </button>
          
          <button
            className={`
              p-1.5 rounded-md mr-1 focus:outline-none
              ${hasSelection ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}
            `}
            onClick={markSelectedAsUnread}
            disabled={!hasSelection}
            title="Mark as unread"
          >
            <Mail className="h-5 w-5" />
          </button>
          
          <button
            className={`
              p-1.5 rounded-md text-red-500 focus:outline-none
              ${hasSelection ? 'hover:bg-red-50' : 'text-gray-400 cursor-not-allowed'}
            `}
            disabled={!hasSelection}
            title="Delete"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionControls;