import { useState, useMemo, useCallback } from 'react';
import { Email, EmailFilterOptions, SelectionState } from '../types/email';
import { mockEmails } from '../data/mockEmails';

export const useEmails = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterOptions, setFilterOptions] = useState<EmailFilterOptions>({
    search: '',
    startDate: null,
    endDate: null,
    sortBy: 'date',
    sortDirection: 'desc',
    favoritesOnly: false
  });
  
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedIds: new Set<string>(),
    selectionMode: 'none',
    matchingIds: []
  });

  // Filter and sort emails based on current options
  const filteredEmails = useMemo(() => {
    let result = [...emails];
    
    // Filter by search term
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      result = result.filter(email => 
        email.title.toLowerCase().includes(searchLower) || 
        email.sender.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by date range
    if (filterOptions.startDate) {
      result = result.filter(email => 
        new Date(email.date) >= new Date(filterOptions.startDate!)
      );
    }
    
    if (filterOptions.endDate) {
      result = result.filter(email => 
        new Date(email.date) <= new Date(filterOptions.endDate!)
      );
    }
    
    // Filter by favorites
    if (filterOptions.favoritesOnly) {
      result = result.filter(email => email.isFavorite);
    }
    
    // Sort emails
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (filterOptions.sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'favorite':
          comparison = (a.isFavorite === b.isFavorite) ? 0 : a.isFavorite ? -1 : 1;
          break;
      }
      
      return filterOptions.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    // Update matching IDs for selection
    setSelectionState(prev => ({
      ...prev,
      matchingIds: result.map(email => email.id)
    }));
    
    return result;
  }, [emails, filterOptions]);
  
  // Get paginated data
  const paginatedEmails = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmails.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEmails, currentPage, itemsPerPage]);
  
  // Total pages calculation
  const totalPages = useMemo(() => 
    Math.ceil(filteredEmails.length / itemsPerPage),
    [filteredEmails.length, itemsPerPage]
  );
  
  // Toggle favorite status
  const toggleFavorite = useCallback((id: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
      )
    );
  }, []);
  
  // Toggle selection for a single email
  const toggleSelection = useCallback((id: string) => {
    setSelectionState(prev => {
      const newSelectedIds = new Set(prev.selectedIds);
      
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      
      return {
        ...prev,
        selectedIds: newSelectedIds,
        selectionMode: newSelectedIds.size === 0 
          ? 'none' 
          : newSelectedIds.size === filteredEmails.length 
            ? 'all' 
            : 'some'
      };
    });
  }, [filteredEmails.length]);
  
  // Select all emails on current page
  const selectPage = useCallback(() => {
    setSelectionState(prev => {
      const newSelectedIds = new Set(prev.selectedIds);
      paginatedEmails.forEach(email => newSelectedIds.add(email.id));
      
      return {
        ...prev,
        selectedIds: newSelectedIds,
        selectionMode: newSelectedIds.size === filteredEmails.length ? 'all' : 'some'
      };
    });
  }, [paginatedEmails, filteredEmails.length]);
  
  // Deselect all emails on current page
  const deselectPage = useCallback(() => {
    setSelectionState(prev => {
      const newSelectedIds = new Set(prev.selectedIds);
      paginatedEmails.forEach(email => newSelectedIds.delete(email.id));
      
      return {
        ...prev,
        selectedIds: newSelectedIds,
        selectionMode: newSelectedIds.size === 0 ? 'none' : 'some'
      };
    });
  }, [paginatedEmails]);
  
  // Select all emails matching current filters
  const selectAllMatching = useCallback(() => {
    setSelectionState(prev => ({
      selectedIds: new Set(filteredEmails.map(email => email.id)),
      selectionMode: 'allMatching',
      matchingIds: prev.matchingIds
    }));
  }, [filteredEmails]);
  
  // Deselect all emails
  const clearSelection = useCallback(() => {
    setSelectionState(prev => ({
      ...prev,
      selectedIds: new Set(),
      selectionMode: 'none'
    }));
  }, []);
  
  // Apply action to selected emails
  const applyToSelected = useCallback((action: (email: Email) => Email) => {
    if (selectionState.selectedIds.size === 0) return;
    
    setEmails(prev => 
      prev.map(email => 
        selectionState.selectedIds.has(email.id) ? action(email) : email
      )
    );
  }, [selectionState.selectedIds]);
  
  // Mark selected as favorite
  const favoriteSelected = useCallback(() => {
    applyToSelected(email => ({ ...email, isFavorite: true }));
  }, [applyToSelected]);
  
  // Mark selected as not favorite
  const unfavoriteSelected = useCallback(() => {
    applyToSelected(email => ({ ...email, isFavorite: false }));
  }, [applyToSelected]);
  
  // Mark selected as read
  const markSelectedAsRead = useCallback(() => {
    applyToSelected(email => ({ ...email, read: true }));
  }, [applyToSelected]);
  
  // Mark selected as unread
  const markSelectedAsUnread = useCallback(() => {
    applyToSelected(email => ({ ...email, read: false }));
  }, [applyToSelected]);

  return {
    emails,
    paginatedEmails,
    filteredEmails,
    filterOptions,
    currentPage,
    itemsPerPage,
    totalPages,
    selectionState,
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
  };
};