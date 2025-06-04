export interface Email {
  id: string;
  title: string;
  date: string; // ISO string format
  isFavorite: boolean;
  sender: string;
  preview: string;
  read: boolean;
  tags?: string[];
}

export interface EmailFilterOptions {
  search: string;
  startDate: string | null;
  endDate: string | null;
  sortBy: 'date' | 'title' | 'favorite';
  sortDirection: 'asc' | 'desc';
  favoritesOnly: boolean;
}

export interface SelectionState {
  selectedIds: Set<string>;
  selectionMode: 'none' | 'some' | 'all' | 'allMatching';
  matchingIds: string[];
}